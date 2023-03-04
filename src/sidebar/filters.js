const filters = [
  {
    name: 'All',
    filter: function all(todo) {
      return todo
    }
  },
  {
    name: 'Unfinished',
    filter: function unfinished(todo) {
      const completed = todo.tasks.reduce((acc, curr) => curr.completed ? acc + 1 : acc, 0)
      return completed !== todo.tasks.length ? true : false
    }
  },
  {
    name: 'Empty',
    filter: function empty(todo) {
      return todo.tasks.length === 0 ? true : false;
    }
  },
  {
    name: 'Completed',
    filter: function completed(todo){
      const completed = todo.tasks.reduce((acc, curr) => curr.completed ? acc + 1 : acc, 0)
      return (completed === todo.tasks.length) && (completed > 0) ? true : false
    }
  }
]

export default filters