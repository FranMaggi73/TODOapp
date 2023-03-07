import fs from 'fs';
import crypto from 'crypto';

class TodosRepository {
  constructor(filename) {
    if(!filename) {
      throw new Error('Creating a repository requires a filename');
    };

    this.filename = filename;
    try {
      fs.accessSync(this.filename);
    } catch (error) {
      fs.writeFileSync(this.filename, '{}');
    };
  };

  randomId() {
    return crypto.randomBytes(8).toString('hex');
  }

  async writeAll(todos) {
    await fs.promises.writeFile(this.filename, JSON.stringify(todos, null, 2), 'utf8');
  };

  async getAll() {
    return JSON.parse(await fs.promises.readFile(this.filename, {
      encoding: 'utf8'
    }));
  }

  async getAllOf(userTodos) {
    const response = {};
    const todos = await JSON.parse(await fs.promises.readFile(this.filename, {
      encoding: 'utf8'
    }));
    for(let todoId in userTodos) {
      response[todoId] = todos[todoId];
    }
    return response;
  };

  async getById(id) {
    const todos = await this.getAll();
    return todos[id];
  };

  async deleteTodo(id) {
    const todos = await this.getAll();
    delete todos[id];
    await this.writeAll(todos);
  };

  async createTodo(title) {
    const id = this.randomId();
    const todos = await this.getAll();
    todos[id] = { title, tasks: {} };
    await this.writeAll(todos);
    return id;
  };

  async updateTodo(id, attrs) {
    const todos = await this.getAll();
    Object.assign(todos[id], attrs);
    await this.writeAll(todos);
  };

  async createTask(id, title) {
    const taskId = this.randomId();
    const { tasks } = await this.getById(id);
    tasks[taskId] = { title, completed: false };
    await this.updateTodo(id, { tasks });
  };

  async deleteTask(id, taskId) {
    const { tasks } = await this.getById(id);
    delete tasks[taskId]
    await this.updateTodo(id, { tasks });
  };

  async updateTask(id, taskId, attrs) {
    const { tasks } = await this.getById(id);
    Object.assign(tasks[taskId], attrs);
    await this.updateTodo(id, { tasks });
  };
}

export default new TodosRepository('todos.json');