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
    fetch('/todos/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title })
    });
  },

  async deleteTodo(id){
    await fetch(`/todos/delete/${id}`, {
      method: 'DELETE'
    });
  },

  async deleteTask(id, taskId, update = () => {}) {
    await fetch(`/todos/delete-task/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id })
    });
    update();
  },

  async newTask(id, update = () => {}) {
    const input = document.querySelector('.new-task-input');
    const title = input.value;
    input.value = '';
    await fetch(`/todos/create-task/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title })
    });
    update();
  },

  async checkTasks(id, taskId, value, update = () => {}) {
    await fetch(`/todos/check-task/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ taskId, completed: value })
    });
    update();
  }
}

export default api