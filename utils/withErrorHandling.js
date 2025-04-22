// utils/withErrorHandling.js

export function withErrorHandling(handler) {
  return async (req, res) => {
    try {
      return await handler(req, res);
    } catch (error) {
      console.error("❌ Server Error:", error);
      return res.status(500).json({
        error: "Internal Server Error",
        details: error.message,
      });
    }
  };
}
