const jwt = require("jsonwebtoken");
const { ENV } = require("../configs/connection");

const AuthMiddleware = (req, res, next) => {
  try {
    const bearerToken = req.authorization || req.headers.authorization;
    if (!bearerToken) {
      throw new Error("Invalid Bearer Token");
    }
    // Extract token from "Bearer <token>"
    const token = bearerToken.split(" ")[1];

    if (!token) {
      throw new Error("Invalid token format");
    }

    // Verify token
    jwt.verify(token, ENV.JWT_SECRET, (err, decoded) => {
      if (err) {
        throw new Error("Invalid or expired token");
      }

      // Attach decoded token data to request
      req.user = decoded; // Contains userId and email
      console.log("Authenticated user:", req.user);
      next(); // Proceed to next middleware/controller
    });
  } catch (err) {
    console.error("Unauthorized User", err.message);
    res.status(401).json({
      status: false,
      message: "You do not have access to this service",
      error: err.message,
    });
  }
};

module.exports = { AuthMiddleware };
