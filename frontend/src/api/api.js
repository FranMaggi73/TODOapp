import debounce from 'lodash.debounce';

const api = {
  async getTodos(){
    return fetch('/todos').then(res => res.json())
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

  createTodo(title, setTodos) {
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

  updateTodo(todo, setTodo) {
    fetch(`/todos/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ todo })
    })
    .then(res => res.json())
    .then(res => setTodo(res))
  },

  deleteTodo(id, setTodos, navigate) {
    fetch(`/todos/delete/${id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(res => setTodos(res))
    .finally(() => {if(navigate) navigate('/')});
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
  }
}

export default api