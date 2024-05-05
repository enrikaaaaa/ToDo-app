import { ObjectId } from "mongodb";
import { Router } from "express";
import connectToDB from "../config/db";

const router = Router();

router.get("/users", async (req, res) => {
  try {
    const db = await connectToDB();
    const data = await db.collection("users").find().toArray();
    res.send(data);
  } catch (error) {
    return res.status(500).send({ error });
  }
});

router.post("/users", async (req, res) => {
  try {
    const db = await connectToDB();
    const newPet = {
      ...req.body,
      ownerId: new ObjectId(`${req.body.ownerId}`),
    };
    const dbRes = await db.collection("users").insertOne(newPet);
    res.send(dbRes);
  } catch (err) {
    res.status(500).send({ err });
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connectToDB();
    const data = await db
      .collection("users")
      .deleteOne({ _id: new ObjectId(id) });
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

export default router;
