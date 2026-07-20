const { calculateLeadScore, getConfidenceLevel, getBuyingIntent } = require("../utils/leadScoring");

function buildFallbackResponse(message, leadContext = {}) {
  const text = message.toLowerCase();
  const extracted = { ...leadContext };

  if (!extracted.destination) {
    const destinationMatch = text.match(/to\s+([a-z\s]+?)(?:\s+in|\s+for|\s+with|\.|$)/i);
    if (destinationMatch) {
      extracted.destination = destinationMatch[1].trim();
    }
  }

  if (!extracted.tripType) {
    if (text.includes("honeymoon")) extracted.tripType = "Honeymoon";
    else if (text.includes("family")) extracted.tripType = "Family";
    else if (text.includes("business")) extracted.tripType = "Business";
  }

  if (!extracted.budget) {
    const budgetMatch = text.match(/(?:budget|under|around)\s+₹?([\d,.]+\s*(?:lakh|lac|k|crore)?)/i);
    if (budgetMatch) {
      extracted.budget = budgetMatch[1].trim();
    }
  }

  if (!extracted.travelers) {
    const travelersMatch = text.match(/(\d+)\s+(?:travelers|people|adults|pax|persons)/i);
    if (travelersMatch) {
      extracted.travelers = travelersMatch[1];
    }
  }

  const score = calculateLeadScore(extracted);
  const confidence = getConfidenceLevel(score);
  const buyingIntent = getBuyingIntent(score, extracted);
  const qualified = score >= 80 || buyingIntent === "Qualified";

  return {
    reply: qualified
      ? "I’ve captured the key details and I can now request contact information to hand this over to a consultant."
      : "Thanks. I’ve captured that detail. If you share your budget, travel dates, and number of travelers, I can qualify the trip faster.",
    extracted,
    score,
    confidence,
    buyingIntent,
    qualified,
    requestContact: qualified,
    summary: extracted.destination
      ? `Travel request for ${extracted.destination} with a ${extracted.tripType || "trip"} focus and ${confidence.toLowerCase()} buying intent.`
      : "Travel request captured. Waiting for more details to generate a complete summary.",
  };
}

async function generateTravelAssistantResponse({ message, leadContext = {} }) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return buildFallbackResponse(message, leadContext);
  }

  const model = process.env.GEMINI_MODEL || "gemini-2.0-flash";
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const prompt = `You are an AI travel consultant. Return only JSON with the keys: reply, extracted, score, confidence, buyingIntent, qualified, requestContact, summary.
Current lead context: ${JSON.stringify(leadContext)}
User message: ${message}

Extract travel fields such as destination, departureCity, travelDate, travelMonth, travelers, budget, duration, tripType, specialRequirements, fullName, phoneNumber, and email. Score from 0 to 100. Confidence must be Low, Medium, or High. buyingIntent can be Low, Medium, High, Very High, or Qualified.`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.2, responseMimeType: "application/json" },
    }),
  });

  if (!response.ok) {
    return buildFallbackResponse(message, leadContext);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    return buildFallbackResponse(message, leadContext);
  }

  try {
    const parsed = JSON.parse(text);
    return {
      reply: parsed.reply || buildFallbackResponse(message, leadContext).reply,
      extracted: parsed.extracted || leadContext,
      score: Number(parsed.score ?? 0),
      confidence: parsed.confidence || "Low",
      buyingIntent: parsed.buyingIntent || "Low",
      qualified: Boolean(parsed.qualified),
      requestContact: Boolean(parsed.requestContact),
      summary: parsed.summary || buildFallbackResponse(message, leadContext).summary,
    };
  } catch {
    return buildFallbackResponse(message, leadContext);
  }
}

module.exports = { generateTravelAssistantResponse };