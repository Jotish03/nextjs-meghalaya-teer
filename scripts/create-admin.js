const { MongoClient } = require("mongodb");
const { hash } = require("bcrypt");
require("dotenv").config({ path: ".env.local" });

async function createAdminUser() {
  try {
    console.log("Connecting to MongoDB...");
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db("nextjsteer");
    const collection = db.collection("users");

    const adminEmail =
      process.env.ADMIN_EMAIL || "admin@morningsundayteer.today";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

    // Check if admin user already exists
    const existingAdmin = await collection.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log("Admin user already exists!");
      await client.close();
      return;
    }

    // Hash password
    const hashedPassword = await hash(adminPassword, 12);

    // Create admin user
    const result = await collection.insertOne({
      email: adminEmail,
      password: hashedPassword,
      name: "Admin",
      role: "admin",
      createdAt: new Date(),
    });

    console.log("Admin user created successfully!");
    console.log("Email:", adminEmail);
    console.log("Password:", adminPassword);
    console.log("User ID:", result.insertedId);

    await client.close();
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
}

createAdminUser();
