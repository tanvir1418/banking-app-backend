const express = require("express");
const router = express.Router();
const {
  register,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
const validate = require("../middlewares/validationMiddleware");
const {
  registerValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
} = require("../validations/authValidation");

// @route   POST /api/public/register
// @desc    Register a new user
// @access  Public
router.post("/register", validate(registerValidation), register);

// @route   POST /api/public/login
// @desc    Login user/admin
// @access  Public
router.post("/login", validate(loginValidation), login);

// @route   POST /api/public/forgot-password
// @desc    Send password reset email
// @access  Public
router.post(
  "/forgot-password",
  validate(forgotPasswordValidation),
  forgotPassword
);

// @route   POST /api/public/reset-password/:token
// @desc    Reset password using token
// @access  Public
router.post(
  "/reset-password/:token",
  validate(resetPasswordValidation),
  resetPassword
);

module.exports = router;
