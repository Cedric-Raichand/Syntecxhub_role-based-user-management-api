const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const User = require("../models/User");


// REGISTER
router.post("/register", async (req, res) => {

  try {

    const {
      username,
      email,
      password
    } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        message: "User already exists"
      });

    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully"
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});


// LOGIN
router.post("/login", async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message: "Invalid credentials"
      });

    }

    // BLOCKED USER CHECK
    if (user.blocked) {

      return res.status(403).json({
        message: "User account is blocked"
      });

    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid credentials"
      });

    }

    const token = jwt.sign({

      id: user._id,
      email: user.email,
      role: user.role

    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h"
    });

    res.json({ token });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});

module.exports = router;