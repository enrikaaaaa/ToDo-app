const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { fetchUsersByEmail } = require("../../api/users");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const users = await fetchUsersByEmail(req.body.email);
    const user = users[0];

    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
