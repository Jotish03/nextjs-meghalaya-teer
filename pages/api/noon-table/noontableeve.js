import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  let client;

  try {
    client = await MongoClient.connect("mongodb://localhost:27017");
    const db = client.db("nextjsteer");
    const collection = db.collection("noonevetable");

    if (req.method === "POST") {
      // Check if a record already exists
      const existingRecord = await collection.findOne({});
      if (existingRecord) {
        return res.status(400).json({
          message:
            "Noon Evening Table result already exists. Delete the previous record to add a new one.",
        });
      }

      const { eveningResult } = req.body;
      console.log("Noon Evening Table:", eveningResult);

      await collection.insertOne({ result: eveningResult });

      console.log("Noon Evening Table Result added to MongoDB:", eveningResult);
      return res.status(200).json({ message: "Result is successfully added" });
    } else if (req.method === "GET") {
      const data = await collection.findOne({});

      console.log("Data retrieved from MongoDB:", data);
      return res.status(200).json({ result: data });
    } else if (req.method === "DELETE") {
      // New route for DELETE method
      await collection.deleteOne({});

      console.log("Noon Evening result deleted from MongoDB");
      return res
        .status(200)
        .json({ message: "Noon Evening result deleted successfully" });
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
