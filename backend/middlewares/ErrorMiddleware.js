class ErrorHandler extends Error {
  constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  // Set default values
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  // Handle specific errors
  if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
      err = new ErrorHandler(message, 400);
  } else if (err.name === "JsonWebTokenError") {
      const message = "JSON Web Token is invalid. Try again!";
      err = new ErrorHandler(message, 400);
  } else if (err.name === "TokenExpiredError") {
      const message = "JSON Web Token has expired. Try again!";
      err = new ErrorHandler(message, 400);
  } else if (err.name === "CastError") {
      const message = `Invalid ${err.path}`;
      err = new ErrorHandler(message, 400);
  }

  // Extract error messages
  const errorMessage = err.errors
      ? Object.values(err.errors).map(error => error.message).join(" ")
      : err.message;

  // Send the response
  if (!res.headersSent) {
      return res.status(err.statusCode).json({
          success: false,
          message: errorMessage,
      });
  } else {
      // If headers are already sent, handle this scenario (e.g., log the issue)
      console.error("Headers already sent. Error details:", err);
  }
};

export default ErrorHandler;
