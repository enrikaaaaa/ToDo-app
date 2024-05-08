import { ObjectId } from "mongodb";
import { Router } from "express";
import connectToDB from "../config/db";

const router = Router();

router.get("/tasks", async (req, res) => {
  try {
    const db = await connectToDB();
    const tasks = await db.collection("tasks").find().toArray();
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid task ID format" });
    }

    const db = await connectToDB();
    const updatedTask = req.body;
    const data = await db
      .collection("tasks")
      .updateOne({ _id: new ObjectId(id) }, { $set: updatedTask });

    res.json(data);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid task ID format" });
    }

    const db = await connectToDB();
    const data = await db
      .collection("tasks")
      .deleteOne({ _id: new ObjectId(id) });

    res.json(data);
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
