const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const URI = process.env.DB_CONNECTION_STRING;
const client = new MongoClient(URI);
const app = express();
const PORT = process.env.PORT || 8081;
app.use(express.json());
app.use(cors());

app.get("/users", async (req, res) => {
  try {
    await client.connect();
    const data = await client.db("ToDo").collection("users").find().toArray();
    console.log(data);
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err });
  } finally {
    await client.close();
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
