const api = {
  async getTodos(){
    return fetch('/todos')
      .then((response) => {
        if(response.status === 200){
          return response.json();
        }
        throw new Error(`${response.status} - ${response.statusText}`);
      });
  },

  async getTodo(id){
    return await fetch(`/todos/${id}`)
    .then((response) => {
      if(response.status === 200){
        return response.json();
      }
      throw new Error(`${response.status} - ${response.statusText}`);
    })
  },

  async createTodo(title, setTodos){
    fetch('/todos/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title })
    })
    .then(res => res.json())
    .then(res => setTodos(res))
  },

  async deleteTodo(id, setTodos, navigate){
    fetch(`/todos/delete/${id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(res => setTodos(res))
    .finally(() => {if(navigate) navigate('/')});
  },

  async deleteTask(id, taskId, setTodo) {
    fetch(`/todos/delete-task/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id })
    })
    .then(res => res.json())
    .then(res => setTodo(res));
  },

  newTask(id, todo, setTodo) {
    const input = document.querySelector('.new-task-input');
    const task = { _id: '1', title: input.value, completed: false };
    input.value = '';
    todo.tasks.push(task);
    setTodo({...todo})
    fetch(`/todos/create-task/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({task})
    })
    .then(res => res.json())
    .then(res => setTodo(res))
  },

  async updateTask(id, task, setTodo, update) {
    Object.assign(task, update);
    fetch(`/todos/update-task/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({task})
    })
    .then(res => res.json())
    .then(res => setTodo(res));
  }
}

export default api