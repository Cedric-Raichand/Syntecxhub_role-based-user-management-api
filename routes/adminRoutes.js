const express = require("express");

const router = express.Router();

const User = require("../models/User");
const AuditLog = require("../models/AuditLog");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");


// GET ALL USERS (ADMIN ONLY)
router.get(
  "/users",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {

    try {

      const users = await User.find();

      res.json(users);

    } catch (err) {

      res.status(500).json({
        error: err.message
      });

    }

  }
);


// PROMOTE USER TO ADMIN
router.put(
  "/users/:id/promote",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {

    try {

      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          role: "admin"
        },
        { new: true }
      );

      if (!user) {

        return res.status(404).json({
          message: "User not found"
        });

      }

      // AUDIT LOG
      await AuditLog.create({
        action: "Promoted user to admin",
        performedBy: req.user.email,
        targetUser: user.email
      });

      res.json({
        message: "User promoted to admin",
        user
      });

    } catch (err) {

      res.status(500).json({
        error: err.message
      });

    }

  }
);


// BLOCK USER
router.put(
  "/users/:id/block",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {

    try {

      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          blocked: true
        },
        { new: true }
      );

      if (!user) {

        return res.status(404).json({
          message: "User not found"
        });

      }

      // AUDIT LOG
      await AuditLog.create({
        action: "Blocked user",
        performedBy: req.user.email,
        targetUser: user.email
      });

      res.json({
        message: "User blocked successfully",
        user
      });

    } catch (err) {

      res.status(500).json({
        error: err.message
      });

    }

  }
);


// VIEW AUDIT LOGS
router.get(
  "/audit-logs",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {

    try {

      const logs = await AuditLog.find();

      res.json(logs);

    } catch (err) {

      res.status(500).json({
        error: err.message
      });

    }

  }
);

module.exports = router;