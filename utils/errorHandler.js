function handleErrors(err) {
  let errors = {};

  // Check if error message is a stringified JSON (from Zod)
  if (typeof err.message === "string" && err.message.startsWith("[")) {
    try {
      const parsedErrors = JSON.parse(err.message);
      if (Array.isArray(parsedErrors)) {
        parsedErrors.forEach((error) => {
          if (error.path && error.path[0]) {
            errors[error.path[0]] = error.message;
          }
        });
        return {
          message: "Invalid input data",
          errors: errors,
        };
      }
    } catch (e) {
      // If parsing fails, continue to other checks
    }
  }

  // Duplicate key error (E11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    errors[field] = `This ${field} is already registered`;
    return {
      message: `This ${field} is already in use. Please use a different ${field}.`,
      field: field,
    };
  }

  // Validation errors
  if (err.name === "ValidationError") {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
    return {
      message: "Validation failed",
      errors: errors,
    };
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return {
      message: "Invalid token. Please login again.",
      errors: {},
    };
  }

  if (err.name === "TokenExpiredError") {
    return {
      message: "Your session has expired. Please login again.",
      errors: {},
    };
  }

  // Default error - check if err.errors exists
  if (err.errors && typeof err.errors === "object") {
    return {
      message: err.message || "An error occurred",
      errors: err.errors,
    };
  }

  // Final fallback
  return {
    message: err.message || "An unexpected error occurred",
    errors: {},
  };
}

module.exports = { handleErrors };
