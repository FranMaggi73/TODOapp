import express from 'express';
import todosRepo from './repositories/todos.js';
import bodyParser from 'body-parser';
const app = express();

app.use(bodyParser.json());

app.get('/todos', async (req, res) => {
  const todos = await todosRepo.getAll();
  res.json(todos);
});

app.get('/todos/:id', async (req, res) => {
  const todo = await todosRepo.getOne(req.params.id);
  res.json(todo);
});

app.post('/todos/create', async (req, res) => {
  const { title } = req.body;
  await todosRepo.create({ title });
  res.sendStatus(200);
});

app.post('/todos/create-task/:id', async (req, res) => {
  const { title } = req.body;
  await todosRepo.createTask(req.params.id, title);
  res.sendStatus(200);
});

app.put('/todos/check-task/:id', async (req, res) => {
  const { taskId, completed } = req.body;
  await todosRepo.checkTask(req.params.id, taskId, completed);
  res.sendStatus(200);
})

app.delete('/todos/delete/:id', async (req, res) => {
  await todosRepo.delete(req.params.id);
  res.sendStatus(200);
});

app.delete('/todos/delete-task/:taskId', async (req, res) => {
  const { id } = req.body;
  await todosRepo.deleteTask(id, req.params.taskId);
  res.sendStatus(200);
});

app.listen(5000, () => {
  console.log('Server started on port 5000')
});