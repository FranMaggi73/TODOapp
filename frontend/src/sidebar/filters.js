const completed = (todo) => todo.tasks.reduce((acc, curr) => curr.completed ? acc + 1 : acc, 0);

const filters = {
  'All': (todo) => todo,
  'Unfinished': (todo) => completed(todo) !== todo.tasks.length,
  'Empty': (todo) => !todo.tasks.length,
  'Completed': (todo) => (completed(todo) === todo.tasks.length) && (completed(todo) > 0)
}

export default filters