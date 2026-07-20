const { randomUUID } = require("crypto");
const mongoose = require("mongoose");

const { asyncHandler } = require("../middleware/asyncHandler");
const { leadStore: leads } = require("../services/store");
const Lead = require("../models/Lead");

function isMongoReady() {
  return Boolean(process.env.MONGODB_URI) && mongoose.connection.readyState === 1;
}

const listLeads = asyncHandler(async (_req, res) => {
  if (isMongoReady()) {
    const mongoLeads = await Lead.find().sort({ createdAt: -1 });
    return res.json({ leads: mongoLeads });
  }

  res.json({ leads });
});

const createLead = asyncHandler(async (req, res) => {
  if (isMongoReady()) {
    const lead = await Lead.create(req.body);
    return res.status(201).json({ lead });
  }

  const lead = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...req.body,
  };

  leads.unshift(lead);

  res.status(201).json({ lead });
});

const deleteLead = asyncHandler(async (req, res) => {
  if (isMongoReady()) {
    await Lead.findByIdAndDelete(req.params.id);
    return res.status(204).send();
  }

  const index = leads.findIndex((lead) => lead.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Lead not found" });
  }

  leads.splice(index, 1);

  res.status(204).send();
});

module.exports = {
  listLeads,
  createLead,
  deleteLead,
};