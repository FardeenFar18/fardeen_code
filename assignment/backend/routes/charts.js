import express from "express";
import { protect } from "../middlewares/auth.js";
import Chart from "../models/Chart.js";

const router = express.Router();


router.post("/add", protect, async (req, res) => {
  try {
    const { label, value } = req.body;

    if (!label || !value) {
      return res.status(400).json({ message: "Label and value are required" });
    }

    const newChart = await Chart.create({
      label,
      value,
      user: req.user._id,
    });

    res.status(201).json(newChart);
  } catch (error) {
    console.error("Add chart error:", error.message);
    res.status(500).json({ message: "Failed to add chart data" });
  }
});


router.get("/summary", protect, async (req, res) => {
  try {
    const data = await Chart.find({ user: req.user._id }).sort({ createdAt: 1 });
    res.json(data);
  } catch (error) {
    console.error("Fetch chart error:", error.message);
    res.status(500).json({ message: "Failed to fetch chart data" });
  }
});

export default router;
