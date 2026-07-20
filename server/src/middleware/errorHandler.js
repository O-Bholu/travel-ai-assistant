function errorHandler(error, _req, res, _next) {
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    message: error.message || "Internal Server Error",
    ...(process.env.NODE_ENV !== "production" ? { stack: error.stack } : {}),
  });
}

module.exports = { errorHandler };