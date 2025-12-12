import { MongoClient } from "mongodb";
import { hash } from "bcrypt";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db("nextjsteer");
    const collection = db.collection("users");

    // Check if user already exists
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      await client.close();
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Create admin user
    const result = await collection.insertOne({
      email,
      password: hashedPassword,
      name: name || email.split("@")[0],
      role: "admin",
      createdAt: new Date(),
    });

    await client.close();

    res.status(201).json({
      message: "Admin user created successfully",
      userId: result.insertedId,
      role: "admin",
    });
  } catch (error) {
    console.error("Error creating admin user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
