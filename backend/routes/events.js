import express from "express";
import Event from "../models/Event.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
const router = express.Router();
import process from "node:process";
// Middleware to verify JWT and attach userId
function protect(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = userId;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}

// GET all events
router.get("/", async (req, res) => {
  const events = await Event.find().lean();
  res.json(events);
});

// GET enrolled events for current user
router.get("/enrolled", protect, async (req, res) => {
  const events = await Event.find({ enrolled: req.userId }).lean();
  res.json(events);
});

// POST enroll/unenroll toggle
router.post("/:id/enroll", protect, async (req, res) => {
  const ev = await Event.findById(req.params.id);
  if (!ev) return res.status(404).json({ message: "Event not found" });

  const idx = ev.enrolled.indexOf(req.userId);
  if (idx >= 0) {
    ev.enrolled.splice(idx, 1);
  } else {
    ev.enrolled.push(req.userId);
  }
  await ev.save();
  res.json({ enrolled: idx < 0 });
});

export default router;
