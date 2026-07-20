function calculateLeadScore(profile = {}) {
  let score = 0;

  if (profile.destination) score += 10;
  if (profile.travelDate || profile.travelMonth) score += 10;
  if (profile.budget) score += 20;
  if (profile.travelers) score += 10;
  if (profile.tripType) score += 10;
  if (profile.duration) score += 5;
  if (profile.departureCity) score += 5;
  if (profile.fullName) score += 5;
  if (profile.phoneNumber) score += 20;
  if (profile.email) score += 5;

  return Math.min(score, 100);
}

function getConfidenceLevel(score) {
  if (score >= 80) return "High";
  if (score >= 45) return "Medium";
  return "Low";
}

function getBuyingIntent(score, profile = {}) {
  if (profile.phoneNumber && score >= 80) return "Qualified";
  if (score >= 75) return "Very High";
  if (score >= 45) return "Medium";
  return "Low";
}

module.exports = {
  calculateLeadScore,
  getConfidenceLevel,
  getBuyingIntent,
};