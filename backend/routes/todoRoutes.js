// src/routes/todoRoutes.js
const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// GET all active todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find({ isDeleted: false });
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST a new todo
router.post('/', async (req, res) => {
  try {
    const { text } = req.body;
    const todo = new Todo({ text });
    await todo.save();
    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET a specific todo by ID
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo || todo.isDeleted) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// UPDATE a todo by ID
router.put('/:id', async (req, res) => {
  try {
    const { text } = req.body;
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { text },
      { new: true }
    );
    if (!todo || todo.isDeleted) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// "Soft delete" a todo by ID
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo || todo.isDeleted) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    todo.isDeleted = true;
    await todo.save();

    res.json({ message: 'Todo soft deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
