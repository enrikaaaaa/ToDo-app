const express = require("express");
require("dotenv").config();
const { MongoClient, ObjectId } = require("mongodb");

const router = express.Router();
const URI = process.env.MONGO_URL;
const client = new MongoClient(URI);

router.post("/tasks", async (req, res) => {
  let body = req.body;
  body.Priority = new ObjectId(`${body.Priority}`);
  body.AssignedTo = new ObjectId(`${body.AssignedTo}`);
  try {
    await client.connect();
    const data = await client.db("ToDo").collection("tasks").insertOne(body);
    await client.close();
    return res.send(data);
  } catch (err) {
    Í;
    return res.status(500).send({ err });
  }
});

router.get("/tasks", async (req, res) => {
  try {
    await client.connect();

    const data = await client
      .db("ToDo")
      .collection("tasks")
      .aggregate([
        {
          $lookup: {
            from: "priority",
            localField: "Priority",
            foreignField: "_id",
            as: "priorityData",
          },
        },
        {
          $unwind: "$priorityData",
        },
        {
          $lookup: {
            from: "users",
            localField: "AssignedTo",
            foreignField: "_id",
            as: "userData",
          },
        },
        {
          $unwind: "$userData",
        },
        {
          $project: {
            _id: 1,
            Title: 1,
            Description: 1,
            StartDate: 1,
            EndDate: 1,
            status: 1,
            priority: "$priorityData.Name",
            assignedTo: {
              $concat: [
                { $substr: ["$userData.Name", 0, 1] },
                { $substr: ["$userData.LastName", 0, 1] },
              ],
            },
          },
        },
      ])
      .toArray();

    await client.close();

    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

router.put("/tasks/:id", async (req, res) => {
  try {
    await client.connect();
    const data = await client
      .db("ToDo")
      .collection("tasks")
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });
    await client.close();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

router.get("/tasks/:id", async (req, res) => {
  try {
    await client.connect();
    const data = await client
      .db("ToDo")
      .collection("tasks")
      .findOne({ _id: new ObjectId(req.params.id) });
    await client.close();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    await client.connect();
    const data = await client
      .db("ToDo")
      .collection("tasks")
      .deleteOne({ _id: new ObjectId(req.params.id) });
    await client.close();
    return res.send(data);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

module.exports = router;
