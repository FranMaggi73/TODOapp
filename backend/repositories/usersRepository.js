import fs from 'fs';
import crypto from 'crypto';

class UsersRepository {
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
  };

  async getByEmail(email) {
    const users = await this.getAll();
    return users[email];
  };

  async createUser(email, password) {
    const id = this.randomId();
    const users = await this.getAll();

    if (users[email]) throw new Error('User already exists');

    users[email] = { id, password, todos: {} };
    await this.writeAll(users);
  };

  async addTodo(email, todoId) {
    const users = await this.getAll();
    users[email].todos[todoId] = todoId;
    await this.writeAll(users);
  }

  async removeTodo(email, todoId) {
    const users = await this.getAll();
    delete users[email].todos[todoId];
    await this.writeAll(users);
  }

  async validUser(email, password) {
    const users = await this.getAll();
    return users[email].password === password;
  }
}

export default new UsersRepository('users.json');