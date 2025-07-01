const express = require("express");
const router = express.Router();
const { getProfile } = require("../controllers/authController");
const {
  verifyJWT,
  verifyUserOrAdmin,
} = require("../middlewares/authMiddleware");

// @route   GET /api/common/profile
// @desc    Get current user profile
// @access  Private (User & Admin)
router.get("/profile", verifyJWT, verifyUserOrAdmin, getProfile);

// @route   GET /api/common/verify-token
// @desc    Verify if token is valid
// @access  Private (User & Admin)
router.get("/verify-token", verifyJWT, verifyUserOrAdmin, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Token is valid",
    user: {
      id: req.user._id,
      email: req.user.email,
      role: req.user.role,
    },
  });
});

module.exports = router;
