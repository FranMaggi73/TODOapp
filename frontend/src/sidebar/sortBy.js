const completed = (tasks) => tasks.reduce((acc, curr) => curr.completed ? acc + 1 : acc, 0);
const percentage = (tasks) => completed(tasks) / tasks.length;

const sortBys = {
  'Most Completed': (todoA, todoB) => {
    const percentageA = percentage(todoA.tasks);
    const percentageB = percentage(todoB.tasks);
    return percentageB - percentageA
  },
  'Least Completed': (todoA, todoB) => {
    const percentageA = percentage(todoA.tasks);
    const percentageB = percentage(todoB.tasks);
    return percentageA - percentageB
  }
}

export default sortBys