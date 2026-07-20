const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

const chatRoutes = require("./routes/chatRoutes");
const leadRoutes = require("./routes/leadRoutes");
const conversationRoutes = require("./routes/conversationRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const { notFound } = require("./middleware/notFound");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "travel-ai-assistant-api",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/chat", chatRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/conversation", conversationRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;