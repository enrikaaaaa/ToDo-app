const express = require("express");
require("dotenv").config();
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();
const URI = process.env.MONGO_URL;
const client = new MongoClient(URI);

router.post("/users", async (req, res) => {
    try {
      const newUser = req.body;
      const con = await client.connect();
  
      if (!newUser.Email || !newUser.Password) {
        return res
          .status(400)
          .send({ error: "Email and password are required fields!" });
      }
      const userAlreadyExists = await con
        .db("ToDo")
        .collection("users")
        .findOne({ Email: newUser.Email });
  
      if (userAlreadyExists) {
        return res.status(400).send({ error: "User already exists" });
      }
  
      const saltRounds = 10;
      let hashedPassword;
      try {
        hashedPassword = await bcrypt.hash(newUser.Password, saltRounds);
      } catch (hashError) {
        return res.status(500).send({ error: "Error hashing password" });
      }
  
      try {
        const data = await con
          .db("ToDo")
          .collection("users")
          .insertOne({ ...newUser, Password: hashedPassword });
        await con.close();
        return res.send(data);
      } catch (insertError) {
        return res.status(500).send({ error: "Error inserting user data" });
      }
    } catch (err) {
      return res.status(500).send({ error: "Server error" });
    }
  });
  
  router.post("/login", async (req, res) => {
    try {
      const { Email, Password } = req.body;
  
      if (!Email || !Password) {
        return res
          .status(400)
          .send({ error: "Email and password are required fields" });
      }
      const con = await client.connect();
      const user = await con.db("ToDo").collection("users").findOne({ Email });
  
      if (!user) {
        return res.status(400).send({ error: "User not found" });
      }
  
      const match = await bcrypt.compare(Password, user.Password);
  
      if (!match) {
        return res.status(400).send({ error: "Email or password is incorrect" });
      }
  
      const { _id } = user;
      const token = jwt.sign({ userId: _id }, "privateKey");
  
      await con.close();
      delete user.Password;
      return res.send({ token, user });
    } catch (err) {
      return res.status(500).send({ error: "Internal server error" });
    }
  });
  
  module.exports = router;