import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { name, createdBy } = req.body;

    const project = await Project.create({ name, createdBy });

    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().populate("createdBy", "name email");

    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;