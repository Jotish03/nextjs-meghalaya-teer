// deleteResult.js

import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { id } = req.query;

  let client;

  try {
    client = await MongoClient.connect("mongodb://localhost:27017");
    const db = client.db("nextjsteer");
    const collection = db.collection("noonroundtwo");

    const objectId = new ObjectId(id); // Correct usage with 'new'

    const result = await collection.deleteOne({ _id: objectId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Data not found" });
    }

    return res.status(200).json({ message: "Result deleted successfully" });
  } catch (error) {
    console.error("Error deleting data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (client) {
      client.close();
    }
  }
}
