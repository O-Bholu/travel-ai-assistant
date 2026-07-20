import { useEffect, useState } from "react";

import Sidebar from "../layout/Sidebar";
import Navbar from "../layout/Navbar";
import StatsCard from "../components/dashboard/StatsCard";
import ChatWindow from "../components/dashboard/ChatWindow";
import LeadDetails from "../components/dashboard/LeadDetails";
import LeadScore from "../components/dashboard/LeadScore";
import SummaryCard from "../components/dashboard/SummaryCard";
import {
  buildLeadDetails,
  createDashboardStats,
} from "../constants/dashboard";
import { sendChatMessage } from "../services/chatService";
import { getDashboardOverview } from "../services/dashboardService";
import { getConversation } from "../services/conversationService";
import RecentConversations from "../components/dashboard/RecentConversations";

export default function Dashboard() {
  const [messages, setMessages] = useState([]);
  const [leadContext, setLeadContext] = useState({});
  const [leadScore, setLeadScore] = useState({ score: 0, confidence: "Low", buyingIntent: "Low" });
  const [leadSummary, setLeadSummary] = useState("");
  const [conversationId, setConversationId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [overview, setOverview] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [dashboardCards, setDashboardCards] = useState([]);
  const [recentConversations, setRecentConversations] = useState([]);

  useEffect(() => {
    const savedConversationId = localStorage.getItem("travel-ai-conversation-id");

    if (!savedConversationId) {
      return;
    }

    setConversationId(savedConversationId);

    getConversation(savedConversationId)
      .then((response) => {
        const conversation = response.conversation;
        if (!conversation?.messages?.length) {
          return;
        }

        setMessages(
          conversation.messages.map((message, index) => ({
            id: `${message.role}-${index}`,
            role: message.role,
            content: message.content,
            timestamp: "Saved",
          }))
        );
      })
      .catch(() => {
        localStorage.removeItem("travel-ai-conversation-id");
      });
  }, []);

  useEffect(() => {
    let active = true;

    async function loadOverview() {
      setStatsLoading(true);

      try {
        const overviewResponse = await getDashboardOverview();

        if (!active) {
          return;
        }

        setOverview(overviewResponse.overview);
        setDashboardCards(createDashboardStats(overviewResponse.overview));
        setRecentConversations(overviewResponse.overview.recentConversations || []);

        const latestLead = overviewResponse.overview.latestLead;
        if (latestLead) {
          setLeadContext(latestLead);
          setLeadScore({
            score: Number(latestLead.leadScore || 0),
            confidence: latestLead.confidenceLevel || "Low",
            buyingIntent: latestLead.buyingIntent || "Low",
          });
          setLeadSummary(latestLead.summary || "");
        }
      } catch {
        if (!active) {
          return;
        }

        setDashboardCards([]);
      } finally {
        if (active) {
          setStatsLoading(false);
        }
      }
    }

    loadOverview();

    return () => {
      active = false;
    };
  }, []);

  const handleSend = async (text) => {
    const trimmedText = text.trim();

    if (!trimmedText || isLoading) {
      return;
    }

    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmedText,
      timestamp: "Just now",
    };

    setMessages((current) => [...current, userMessage]);
    setIsLoading(true);
    setError("");

    try {
      const response = await sendChatMessage({
        message: trimmedText,
        conversationId,
        leadContext,
      });

      setConversationId(response.conversationId);
      localStorage.setItem("travel-ai-conversation-id", response.conversationId);

      setMessages((current) => [
        ...current,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: response.assistantMessage,
          timestamp: "Just now",
        },
      ]);

      setLeadContext((current) => ({
        ...current,
        ...(response.extracted || {}),
        summary: response.summary || current.summary,
      }));
      setLeadScore({
        score: response.score ?? 0,
        confidence: response.confidence || "Low",
        buyingIntent: response.buyingIntent || "Low",
      });
      setLeadSummary(response.summary || "");

      const refreshedOverview = await getDashboardOverview();
      setOverview(refreshedOverview.overview);
      setDashboardCards(createDashboardStats(refreshedOverview.overview));
      setRecentConversations(refreshedOverview.overview.recentConversations || []);
    } catch (requestError) {
      const message =
        requestError?.response?.data?.message ||
        requestError?.message ||
        "Unable to reach the AI assistant right now.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const leadDetails = buildLeadDetails(leadContext);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.16),_transparent_35%),linear-gradient(180deg,_#f8fafc,_#eff6ff_45%,_#f8fafc)]" />

      <div className="flex min-h-screen flex-col lg:flex-row">
        <Sidebar />

        <div className="flex min-h-screen min-w-0 flex-1 flex-col bg-slate-50/70">
          <Navbar />

          <main className="flex-1 px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
            <div className="mx-auto flex max-w-[1500px] flex-col gap-6">
              <section className="rounded-[2rem] border border-white/70 bg-white/90 p-5 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-sky-600/80">
                      Live lead intelligence
                    </p>
                    <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                      Travel AI Lead Assistant
                    </h1>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                      Real-time travel conversations, qualification scoring, and MongoDB-backed lead capture.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                    {overview ? overview.summary : "Loading live overview..."}
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
                  {dashboardCards.map((card) => (
                    <StatsCard
                      key={card.title}
                      title={card.title}
                      value={card.value}
                      icon={card.icon}
                      color={card.color}
                      change={card.change}
                    />
                  ))}
                </div>

                <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
                  <div className="space-y-6">
                    <ChatWindow
                      messages={messages}
                      onSend={handleSend}
                      isLoading={isLoading}
                      error={error}
                    />

                    <RecentConversations items={recentConversations} />
                  </div>

                  <aside className="space-y-6 xl:sticky xl:top-24 xl:self-start">
                    <LeadScore
                      score={leadScore.score}
                      confidence={leadScore.confidence}
                      buyingIntent={leadScore.buyingIntent}
                    />

                    <LeadDetails details={leadDetails} />

                    <SummaryCard summary={leadSummary} />
                  </aside>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
