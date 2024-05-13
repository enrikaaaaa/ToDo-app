const express = require("express");
require("dotenv").config();
const { MongoClient, ObjectId } = require("mongodb");

const router = express.Router();
const URI = process.env.MONGO_URL;
const client = new MongoClient(URI);

router.post("/priority", async (req, res) => {
  try {
    await client.connect();
    const data = await client
      .db("ToDo")
      .collection("priority")
      .insertOne(req.body);
    await client.close();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

router.get("/priority", async (req, res) => {
  try {
    await client.connect();
    const data = await client
      .db("ToDo")
      .collection("priority")
      .find()
      .toArray();
    await client.close();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

router.put("/priority/:id", async (req, res) => {
  try {
    await client.connect();
    const data = await client
      .db("ToDo")
      .collection("priority")
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });
    await client.close();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

router.get("/priority/:id", async (req, res) => {
  try {
    await client.connect();
    const data = await client
      .db("ToDo")
      .collection("priority")
      .findOne({ _id: new ObjectId(req.params.id) });
    await client.close();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

module.exports = router;