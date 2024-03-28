import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req, res) {
  let client;

  try {
    client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db("nextjsteer");
    const collection = db.collection("previousresultseve");

    if (req.method === "GET") {
      // Handle GET request to fetch all data
      const results = await collection.find().toArray();
      return res.status(200).json(results);
    } else if (req.method === "POST") {
      // Handle POST request to add new data
      const { city, date, fr, sr } = req.body;
      const result = {
        city,
        date,
        fr,
        sr,
      };

      await collection.insertOne(result);

      console.log("Eve Result added to MongoDB:", result);
      return res.status(201).json({ message: "Eve Result added successfully" });
    } else {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("MongoDB Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (client) {
      client.close();
    }
  }
}
