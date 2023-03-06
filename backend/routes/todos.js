import express from "express";

import todosRepo from '../repositories/todosRepository.js';
import usersRepo from '../repositories/usersRepository.js';

const router = express.Router();

router.get('/todos', async (req, res) => {
  const user = await usersRepo.getByEmail(req.session.userId);
  const todos = await todosRepo.getAllOf(user.todos);
  res.json(todos);
});

router.get('/todos/:id', async (req, res) => {
  const todo = await todosRepo.getById(req.params.id);
  res.json(todo);
});

router.post('/todos/create', async (req, res) => {
  const { title } = req.body;
  const todoId = await todosRepo.createTodo(title);
  await usersRepo.addTodo(req.session.userId, todoId);
  res.sendStatus(200);
});

router.post('/todos/create-task/:id', async (req, res) => {
  const { title } = req.body;
  await todosRepo.createTask(req.params.id, title);
  res.sendStatus(200);
});

router.put('/todos/check-task/:id', async (req, res) => {
  const { taskId, completed } = req.body;
  await todosRepo.updateTask(req.params.id, taskId, { completed });
  res.sendStatus(200);
})

router.delete('/todos/delete/:id', async (req, res) => {
  const user = usersRepo.getByEmail(req.session.userId);
  await todosRepo.deleteTodo(req.params.id);
  await usersRepo.removeTodo(user, req.params.id);
  res.sendStatus(200);
});

router.delete('/todos/delete-task/:taskId', async (req, res) => {
  const { id } = req.body;
  await todosRepo.deleteTask(id, req.params.taskId);
  res.sendStatus(200);
});

export default router