const express = require("express");

const {
  listLeads,
  createLead,
  deleteLead,
} = require("../controllers/leadController");

const router = express.Router();

router.get("/", listLeads);
router.post("/", createLead);
router.delete("/:id", deleteLead);

module.exports = router;