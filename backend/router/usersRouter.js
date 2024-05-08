const express = require("express");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
const connectToDB = require("../config/db");

const router = express.Router();

router.get("/users", async (req, res) => {
  try {
    const db = await connectToDB();
    const users = await db.collection("users").find().toArray();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/users", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { email, password: hashedPassword };

    const db = await connectToDB();
    const result = await db.collection("users").insertOne(newUser);
    res.json(result.ops[0]);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connectToDB();
    const result = await db.collection("users").deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connectToDB();
    const user = await db.collection("users").findOne({ _id: new ObjectId(id) });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
