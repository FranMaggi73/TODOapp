import Repository from "./repository.js";

class TodosRepository extends Repository {
  async create(attrs) {
    attrs.id = this.randomId();
    attrs.tasks = [];
        
    const records = await this.getAll();
    records.push(attrs);
    await this.writeAll(records);

    return attrs;
  };

  async deleteTask(id, taskId) {
    const todo = await this.getOne(id);
    const updatedTasks = todo.tasks.filter((task) => task.id !== taskId);

    await this.update(id, { tasks: updatedTasks });
  };

  async createTask(id, title) {
    const todo = await this.getOne(id);
    const task = { title, completed: false, id: this.randomId() };
    todo.tasks.push(task);
    await this.update(id, { tasks: todo.tasks });
  };

  async checkTask(id, taskId, completed) {
    const todos = await this.getAll();
    const todo = todos.find(todo => todo.id == id);
    const task = todo.tasks.find(task => task.id == taskId);

    Object.assign(task, { completed });
    await this.writeAll(todos);
  }
};

export default new TodosRepository('todos.json');