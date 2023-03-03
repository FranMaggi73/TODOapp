const filters = {
  All(todo) {
    return todo
  },
  Unfinished(todo) {
    const completed = todo.tasks.reduce((acc, curr) => curr.completed ? acc + 1 : acc, 0)
    return completed !== todo.tasks.length ? true : false
  },
  Empty(todo) {
    return todo.tasks.length === 0 ? true : false;
  }
}

export default filters