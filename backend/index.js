const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
require("dotenv").config();

const URI = process.env.DB_CONNECTION_STRING;
const client = new MongoClient(URI);
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(cors());

const connectDB = async (req, res, next) => {
  try {
    await client.connect();
    req.dbClient = client;
    next();
  } catch (error) {
    console.error("Error connecting to database:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

app.use(connectDB);

app.get("/tasks", async (req, res) => {
  try {
    const data = await req.dbClient
      .db("ToDo")
      .collection("tasks")
      .find()
      .toArray();
    return res.send(data);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const dbRes = await req.dbClient
      .db("ToDo")
      .collection("tasks")
      .insertOne(req.body);
    return res.send(dbRes);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dbRes = await req.dbClient
      .db("ToDo")
      .collection("tasks")
      .deleteOne({ _id: new ObjectId(id) });
    return res.send(dbRes);
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const data = await req.dbClient
      .db("ToDo")
      .collection("users")
      .find()
      .toArray();
    return res.send(data);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
