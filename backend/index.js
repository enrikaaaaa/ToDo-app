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

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
