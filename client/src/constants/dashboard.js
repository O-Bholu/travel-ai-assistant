import {
  MessageSquare,
  Users,
  BadgeCheck,
  TrendingUp,
  IndianRupee,
  Plane,
} from "lucide-react";

export const dashboardStatTemplates = [
  {
    title: "Total Conversations",
    icon: MessageSquare,
    color: "bg-gradient-to-br from-cyan-500 to-blue-600",
  },
  {
    title: "New Leads",
    icon: Users,
    color: "bg-gradient-to-br from-violet-500 to-fuchsia-600",
  },
  {
    title: "Qualified Leads",
    icon: BadgeCheck,
    color: "bg-gradient-to-br from-emerald-500 to-teal-600",
  },
  {
    title: "Average Lead Score",
    icon: TrendingUp,
    color: "bg-gradient-to-br from-amber-500 to-orange-600",
  },
  {
    title: "High Intent Leads",
    icon: IndianRupee,
    color: "bg-gradient-to-br from-pink-500 to-rose-600",
  },
  {
    title: "Revenue Potential",
    icon: Plane,
    color: "bg-gradient-to-br from-sky-500 to-indigo-600",
  },
];

function formatCurrency(amount) {
  return `₹${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
    amount
  )}`;
}

export function createDashboardStats(overview = {}) {
  return [
    {
      title: "Total Conversations",
      value: String(overview.totalConversations ?? 0),
      icon: MessageSquare,
      color: "bg-gradient-to-br from-cyan-500 to-blue-600",
      change: "Live from backend",
    },
    {
      title: "Total Leads",
      value: String(overview.totalLeads ?? 0),
      icon: Users,
      color: "bg-gradient-to-br from-violet-500 to-fuchsia-600",
      change: "MongoDB synced",
    },
    {
      title: "Qualified Leads",
      value: String(overview.qualifiedLeads ?? 0),
      icon: BadgeCheck,
      color: "bg-gradient-to-br from-emerald-500 to-teal-600",
      change: "Qualified conversations",
    },
    {
      title: "Average Lead Score",
      value: `${Math.round(overview.averageLeadScore ?? 0)}%`,
      icon: TrendingUp,
      color: "bg-gradient-to-br from-amber-500 to-orange-600",
      change: "Computed from lead scores",
    },
    {
      title: "High Intent Leads",
      value: String(overview.highIntentLeads ?? 0),
      icon: IndianRupee,
      color: "bg-gradient-to-br from-pink-500 to-rose-600",
      change: "Intent from live chat",
    },
    {
      title: "Revenue Potential",
      value: formatCurrency(overview.revenuePotential ?? 0),
      icon: Plane,
      color: "bg-gradient-to-br from-sky-500 to-indigo-600",
      change: "Budget rollup",
    },
  ];
}

export function buildLeadDetails(leadContext = {}) {
  return [
    { label: "Destination", value: leadContext.destination || "Pending" },
    { label: "Travel Date", value: leadContext.travelDate || "Pending" },
    { label: "Travelers", value: leadContext.travelers || "Pending" },
    { label: "Budget", value: leadContext.budget || "Pending" },
    { label: "Trip Type", value: leadContext.tripType || "Pending" },
    { label: "Departure", value: leadContext.departureCity || "Pending" },
  ];
}