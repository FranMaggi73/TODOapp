const completed = (tasks) => Object.values(tasks).reduce((acc, curr) => curr.completed ? acc + 1 : acc, 0);
const percentage = (tasks) => completed(tasks) / Object.keys(tasks).length;

const sortBys = {
  'Most Completed': ([idA, todoA], [idB, todoB]) => {
    return percentage(todoB.tasks) - percentage(todoA.tasks)
  },
  'Least Completed': ([idA, todoA], [idB, todoB]) => {
    return percentage(todoA.tasks) - percentage(todoB.tasks)
  }
}

export default sortBys