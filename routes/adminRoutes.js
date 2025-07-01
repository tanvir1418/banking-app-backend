const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  updateUserStatus,
  deleteUser,
  getDashboardStats,
} = require("../controllers/adminController");
const { verifyJWT, verifyAdmin } = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validationMiddleware");
const Joi = require("joi");

// Validation schema for updating user status
const updateUserStatusValidation = Joi.object({
  isActive: Joi.boolean().required().messages({
    "any.required": "isActive status is required",
  }),
});

// @route   GET /api/admin/dashboard
// @desc    Get admin dashboard statistics
// @access  Private (Admin only)
router.get("/dashboard", verifyJWT, verifyAdmin, getDashboardStats);

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private (Admin only)
router.get("/users", verifyJWT, verifyAdmin, getAllUsers);

// @route   GET /api/admin/users/:id
// @desc    Get user by ID
// @access  Private (Admin only)
router.get("/users/:id", verifyJWT, verifyAdmin, getUserById);

// @route   PUT /api/admin/users/:id/status
// @desc    Update user status (activate/deactivate)
// @access  Private (Admin only)
router.put(
  "/users/:id/status",
  verifyJWT,
  verifyAdmin,
  validate(updateUserStatusValidation),
  updateUserStatus
);

// @route   DELETE /api/admin/users/:id
// @desc    Delete user
// @access  Private (Admin only)
router.delete("/users/:id", verifyJWT, verifyAdmin, deleteUser);

module.exports = router;
