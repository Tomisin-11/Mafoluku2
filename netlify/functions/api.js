// This file runs on Netlify as a serverless function.
// It wraps the existing Express app with serverless-http.

const serverless = require("serverless-http");
const { app, connectDB } = require("../../server/app");

// Netlify reuses function instances between calls, so we connect once.
let handler;

module.exports.handler = async (event, context) => {
  // Keep DB connection alive across warm invocations
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectDB();
  } catch (err) {
    console.error("DB connect failed:", err.message);
    return {
      statusCode: 503,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Database connection failed. Check MONGODB_URI in Netlify env vars." }),
    };
  }

  if (!handler) {
    handler = serverless(app);
  }

  return handler(event, context);
};
