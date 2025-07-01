const { verifyToken } = require("../helpers/jwtHelper");
const User = require("../models/User");

// Verify JWT token
const verifyJWT = async (req, res, next) => {
  try {
    let token;

    // Check if token exists in Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // Verify token
    const decoded = verifyToken(token);

    // Check if user still exists
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists.",
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: "User account is deactivated.",
      });
    }

    // Add user to request object
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token.",
    });
  }
};

// Verify Admin role
const verifyAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin role required.",
    });
  }
  next();
};

// Verify User role
const verifyUser = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(403).json({
      success: false,
      message: "Access denied. User role required.",
    });
  }
  next();
};

// Verify User or Admin role
const verifyUserOrAdmin = (req, res, next) => {
  if (req.user.role !== "user" && req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Insufficient privileges.",
    });
  }
  next();
};

module.exports = {
  verifyJWT,
  verifyAdmin,
  verifyUser,
  verifyUserOrAdmin,
};
