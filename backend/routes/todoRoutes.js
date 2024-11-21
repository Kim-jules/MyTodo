import express from "express";
import Todo from "../models/todo.js";
import { Router } from "express";

// import all controllers
// import SessionController from './app/controllers/SessionController';

const router = new Router();

router.post("/todo/create", async (req, res) => {
  // Getting the task
  const { task, description, done } = req.body;

  try {
    const newTodo = new Todo({ task, description, done });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    console.error("Error details:", error);
    res.status(400).json({ error: "Error creating todo." });
  }
});

router.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(400).json({ error: "Error fetching todos." });
  }
});

router.put("/todo/update/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ error: "Error updating the task." });
  }
});

router.delete("/todo/delete/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Todo deleted successfully."  });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error deleting the items to odo everything." });
  }
});

export default router;
