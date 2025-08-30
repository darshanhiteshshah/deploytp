const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
});

router.post("/", auth, async (req, res) => {
  const task = new Task({ name: req.body.name, user: req.user.id });
  await task.save();
  res.json(task);
});

router.delete("/:id", auth, async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  res.json({ message: "Task deleted" });
});

module.exports = router;
