const User = require("../models/User");

const createDefaultAdmin = async () => {
  try {
    // Check if any admin exists
    const adminExists = await User.findOne({ role: "admin" });

    if (!adminExists) {
      // Create default admin
      const defaultAdmin = await User.create({
        email: process.env.ADMIN_EMAIL || "admin@example.com",
        password: process.env.ADMIN_PASSWORD || "admin123456",
        role: "admin",
        isActive: true,
      });
      // console.log("✅ Default admin created successfully");
    }
  } catch (error) {
    console.error("❌ Error creating default admin:", error.message);
  }
};

module.exports = createDefaultAdmin;
