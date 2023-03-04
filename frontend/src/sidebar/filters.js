const completed = (tasks) => tasks.reduce((acc, curr) => curr.completed ? acc + 1 : acc, 0);

const filters = {
  'All': ([id, todo]) => todo,
  'Unfinished': ([id, todo]) => {
    const tasks = Object.values(todo.tasks);
    return completed(Object.values(todo.tasks)) !== tasks.length
  },
  'Empty': ([id, todo]) => !Object.values(todo.tasks).length,
  'Completed': ([id, todo]) => {
    const tasks = Object.values(todo.tasks);
    return (completed(tasks) === tasks.length) && (completed(tasks) > 0)
  }
}

export default filters