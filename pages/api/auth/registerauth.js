import { MongoClient } from "mongodb";
import { hashSync } from "bcrypt";

export default async function registerauth(req, res) {
  let client;

  if (req.method === "POST") {
    try {
      const { name, email, password, cpassword } = req.body;

      if (!name || !email || !password || !cpassword) {
        return res.status(400).json({ error: "All fields are required" });
      }

      if (password !== cpassword) {
        return res.status(400).json({ error: "Passwords do not match" });
      }

      if (password.length < 6) {
        return res
          .status(400)
          .json({ error: "Password must be at least 6 characters" });
      }

      // Hash the password
      const hashedPassword = hashSync(password, 10);

      // Connect to the MongoDB database
      client = await MongoClient.connect("mongodb://localhost:27017");
      const db = client.db("nextjsteer");
      const collection = db.collection("users");

      // Check if the user already exists with the given email
      const existingUser = await collection.findOne({ email });

      if (existingUser) {
        return res.status(409).json({ error: "Email already exists" });
      }

      const userData = {
        role: "user",
        name,
        email,
        password: hashedPassword,
      };

      // Insert the new user data into the database
      await collection.insertOne(userData);
      console.log("User added to MongoDB:", userData);

      return res.status(201).json({
        message: "User registered successfully",
        user: { ...userData, password: undefined }, // Omit password for security
      });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    } finally {
      if (client) {
        client.close();
      }
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
