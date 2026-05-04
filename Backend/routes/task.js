import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

// CREATE TASK
router.post("/create", async (req, res) => {
  try {
    const { title, projectId, assignedTo } = req.body;

    const task = await Task.create({
      title,
      projectId,
      assignedTo
    });

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET TASKS BY PROJECT
router.get("/:projectId", async (req, res) => {
  try {
    const tasks = await Task.find({ projectId: req.params.projectId })
      .populate("assignedTo", "name email");

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE TASK STATUS
router.put("/update/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;