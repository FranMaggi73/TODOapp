const completed = (tasks) => tasks.reduce((acc, curr) => curr.completed ? acc + 1 : acc, 0);

const filters = {
  'All': (todo) => todo,
  'Unfinished': (todo) => completed(todo.tasks) !== todo.tasks.length,
  'Empty': (todo) => !todo.tasks.length,
  'Completed': (todo) => (completed(todo.tasks) === todo.tasks.length) && (completed(todo.tasks) > 0)
}

export default filters