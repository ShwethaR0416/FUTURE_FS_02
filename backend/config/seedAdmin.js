const Admin = require("../models/Admin");

const seedAdmin = async () => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminName = process.env.ADMIN_NAME || "System Admin";

  if (!adminEmail || !adminPassword) {
    console.warn("Default admin was not created because admin credentials are missing.");
    return;
  }

  const existingAdmin = await Admin.findOne({ email: adminEmail.toLowerCase() });

  if (existingAdmin) {
    return;
  }

  await Admin.create({
    name: adminName,
    email: adminEmail.toLowerCase(),
    password: adminPassword
  });

  console.log("Default admin account created successfully");
};

module.exports = seedAdmin;
