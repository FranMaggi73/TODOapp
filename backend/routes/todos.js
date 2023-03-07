import express from "express";

import todosRepo from '../repositories/todosRepository.js';
import usersRepo from '../repositories/usersRepository.js';

import usersDB from "../db/usersDB.js";
import todosDB from "../db/todosDB.js";

const router = express.Router();

router.get('/todos', async (req, res) => {
  const user = await usersDB.Get(req.session.userId);
  const todos = await todosDB.GetAll(user[0].todos);
  res.json(todos);
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
  const { title } = req.body;
  const todo = await todosDB.PushTask(req.params.id, { title });
  res.json(todo);
});

router.put('/todos/update-task/:id', async (req, res) => {
  const { task } = req.body;
  console.log(task)
  await todosDB.UpdateTask(req.params.id, task);
  res.sendStatus(200);
})

router.delete('/todos/delete/:id', async (req, res) => {
  await todosDB.Delete(req.params.id);
  const user = await usersDB.PullTodo(req.session.userId, req.params.id);
  const todos = await todosDB.GetAll(user[0].todos);
  res.json(todos);
});

router.delete('/todos/delete-task/:taskId', async (req, res) => {
  const { id } = req.body;
  const todo = await todosDB.PullTask(id, req.params.taskId);
  console.log(todo[0])
  res.json(todo);
});

export default router