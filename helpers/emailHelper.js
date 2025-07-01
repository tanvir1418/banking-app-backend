const nodemailer = require("nodemailer");

// Create transporter
const createTransporter = async () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send email function
const sendEmail = async (options) => {
  try {
    const transporter = await createTransporter();
    const mailOptions = {
      from: '"Bank App" <admin@bankapp.com>',
      to: options.email,
      subject: options.subject,
      html: options.message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Transporter Error: ", error);
        return false;
      } else {
        return true;
      }
    });
  } catch (error) {
    console.error("Email sending failed:", error);
    throw new Error("Email could not be sent");
  }
};

// send registration notification email
const sendRegistrationEmail = async (email) => {
  const options = {
    email,
    subject: "Registration Notification",
    message: "Successful registration.",
  };

  await sendEmail(options);
};

// Send login notification email
const sendLoginEmail = async (email) => {
  const options = {
    email,
    subject: "Login Notification",
    message: "Successful login.",
  };

  await sendEmail(options);
};

// Send password reset email
const sendPasswordResetEmail = async (email, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  const options = {
    email,
    subject: "Password Reset",
    message: `Reset password link: ${resetUrl}`,
  };

  await sendEmail(options);
};

module.exports = {
  sendEmail,
  sendRegistrationEmail,
  sendLoginEmail,
  sendPasswordResetEmail,
};
