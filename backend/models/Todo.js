
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  text:  {
    type: String,
    required: true,
  },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
