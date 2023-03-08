import express from "express";

import usersDB from "../db/usersDB.js";
import todosDB from "../db/todosDB.js";

const router = express.Router();

router.get('/todos', async (req, res) => {
  const user = await usersDB.Get(req.session.userId);
  const todos = await todosDB.GetAll(user[0].todos);
  res.json(todos ? todos : []);
});

router.get('/todos/:id', async (req, res) => {
  const todo = await todosDB.Get(req.params.id);
  res.json(todo[0]);
});

router.post('/todos/create', async (req, res) => {
  const { title } = req.body;
  const todoId = await todosDB.Insert(title);
  const user = await usersDB.PushTodo(req.session.userId, todoId);
  const todos = await todosDB.GetAll(user[0].todos);
  res.json(todos);
});

router.post('/todos/create-task/:id', async (req, res) => {
  const { task } = req.body;
  const todo = await todosDB.PushTask(req.params.id, task);
  res.json(todo[0]);
});

router.put('/todos/update', async (req, res) => {
  const { todo } = req.body;
  const updTodo = await todosDB.UpdateTodo(todo._id, todo);
  res.json(updTodo[0]);
});

router.delete('/todos/delete/:id', async (req, res) => {
  await todosDB.Delete(req.params.id);
  const user = await usersDB.PullTodo(req.session.userId, req.params.id);
  const todos = await todosDB.GetAll(user[0].todos);
  res.json(todos);
});

export default router