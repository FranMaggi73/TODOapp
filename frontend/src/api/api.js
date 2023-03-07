const api = {
  async getTodos(){
    return await fetch('/todos')
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

  async createTodo(title){
    return await fetch('/todos/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title })
    })
    .then((response) => {
      if(response.status === 200){
        return response.json();
      }
      throw new Error(`${response.status} - ${response.statusText}`);
    })
  },

  async deleteTodo(id){
    return await fetch(`/todos/delete/${id}`, {
      method: 'DELETE'
    })
    .then((response) => {
      if(response.status === 200){
        return response.json();
      }
      throw new Error(`${response.status} - ${response.statusText}`);
    });
  },

  async deleteTask(id, taskId, update = () => {}) {
    const todo = await fetch(`/todos/delete-task/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id })
    })
    .then((response) => {
      if(response.status === 200){
        return response.json();
      }
      throw new Error(`${response.status} - ${response.statusText}`);
    });
    update(todo[0].tasks);
  },

  async newTask(id, update = () => {}) {
    const input = document.querySelector('.new-task-input');
    const title = input.value;
    input.value = '';
    const todo = await fetch(`/todos/create-task/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title })
    })
    .then((response) => {
      if(response.status === 200){
        return response.json();
      }
      throw new Error(`${response.status} - ${response.statusText}`);
    });
    update(todo.tasks);
  },

  async updateTask(id, task, update) {
    Object.assign(task, update)
    await fetch(`/todos/update-task/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({task})
    });
  }
}

export default api