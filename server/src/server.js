require("dotenv/config");

const app = require("./app");
const { connectDatabase } = require("./config/db");

const port = Number(process.env.PORT || 5000);

async function start() {
  await connectDatabase();

  const server = app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
  });

  const shutdown = () => {
    server.close(() => process.exit(0));
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

start().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});