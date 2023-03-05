const completed = (tasks) => Object.values(tasks).reduce((acc, curr) => curr.completed ? acc + 1 : acc, 0);
const percentage = (tasks) => completed(tasks) / Object.keys(tasks).length;

const sortBys = {
  'Most Completed': ([idA, todoA], [idB, todoB]) => {
    const percentageA = percentage(todoA.tasks);
    const percentageB = percentage(todoB.tasks);
    return percentageB - percentageA
  },
  'Least Completed': ([idA, todoA], [idB, todoB]) => {
    const percentageA = percentage(todoA.tasks);
    const percentageB = percentage(todoB.tasks);
    return percentageA - percentageB
  }
}

export default sortBys