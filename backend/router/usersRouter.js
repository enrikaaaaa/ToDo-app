const express = require("express");
require("dotenv").config();
const { MongoClient, ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const { verifyToken } = require("../middlewares/auth");
const jwt = require("jsonwebtoken");

const router = express.Router();
const URI = process.env.MONGO_URL;
const client = new MongoClient(URI);

router.get("/users", async (req, res) => {
  try {
    await client.connect();
    const data = await client.db("ToDo").collection("users").find().toArray();
    await client.close();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

router.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await client.connect();
    const { id } = req.params;
    const result = await client
      .db("ToDo")
      .collection("users")
      .updateOne({ _id: new ObjectId(id) }, { $set: req.body });
    await client.close();
    return res.send(result);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    await client.connect();
    const data = await client
      .db("ToDo")
      .collection("users")
      .findOne({ _id: new ObjectId(req.params.id) });
    await client.close();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    await client.connect();
    const data = await client
      .db("ToDo")
      .collection("users")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    await client.close();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err });
  }
});


module.exports = router;
