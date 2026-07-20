const { asyncHandler } = require("../middleware/asyncHandler");
const { getDashboardOverview } = require("../services/dashboardService");

const overview = asyncHandler(async (_req, res) => {
  const data = await getDashboardOverview();
  res.json({ overview: data });
});

module.exports = { overview };
