const express = require("express");
const router = express.Router();
const {
  updateProfile,
  changePassword,
  deleteAccount,
} = require("../controllers/userController");
const { verifyJWT, verifyUser } = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validationMiddleware");
const Joi = require("joi");

// Validation schemas for user routes
const updateProfileValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address",
    "any.required": "Email is required",
  }),
});

const changePasswordValidation = Joi.object({
  currentPassword: Joi.string().required().messages({
    "any.required": "Current password is required",
  }),
  newPassword: Joi.string().min(6).required().messages({
    "string.min": "New password must be at least 6 characters long",
    "any.required": "New password is required",
  }),
});

// @route   PUT /api/user/profile
// @desc    Update user profile
// @access  Private (User only)
router.put(
  "/profile",
  verifyJWT,
  verifyUser,
  validate(updateProfileValidation),
  updateProfile
);

// @route   PUT /api/user/change-password
// @desc    Change user password
// @access  Private (User only)
router.put(
  "/change-password",
  verifyJWT,
  verifyUser,
  validate(changePasswordValidation),
  changePassword
);

// @route   DELETE /api/user/account
// @desc    Delete user account
// @access  Private (User only)
router.delete("/account", verifyJWT, verifyUser, deleteAccount);

module.exports = router;
