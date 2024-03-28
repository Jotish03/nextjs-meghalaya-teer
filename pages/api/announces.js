import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  let client;

  try {
    client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db("nextjsteer");
    const collection = db.collection("announcedb");

    if (req.method === "POST") {
      // Check if a record already exists
      const existingRecord = await collection.findOne({});
      if (existingRecord) {
        return res.status(400).json({
          message:
            "Announcement already exists, please delete previous announcement",
        });
      }

      const { announcementData } = req.body;
      console.log("Announcement Data:", announcementData);

      await collection.insertOne({ announceData: announcementData });

      console.log("Announcement added to MongoDB:", announcementData);
      return res
        .status(200)
        .json({ message: "Announcement successfully added" });
    } else if (req.method === "GET") {
      const data = await collection.findOne({});

      console.log("Data retrieved from MongoDB:", data);
      return res.status(200).json({ announceData: data });
    } else if (req.method === "DELETE") {
      // New route for DELETE method
      await collection.deleteOne({}); // Delete the announcement record

      console.log("Announcement deleted from MongoDB");
      return res
        .status(200)
        .json({ message: "Announcement deleted successfully" });
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
