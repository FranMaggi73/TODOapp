import './todos.css';
import React, { useState, useEffect } from 'react';

function Todo(props) {
  return (
    <div className='todo' onClick={e => (window.location.href = `/edit/${props.id}`)}>
      <div className='todo-content'>
        <h1>{props.title}</h1>
          <div className='bar'>
            <progress 
              value={props.completed} 
              max={props.tasks.length} 
              className='progress-bar'
              >
            </progress>
          </div>
      </div>
    </div>
  )
}

function Todos() {
  const [todos, setTodos] = useState([]);

  const fetchData = async () => {
    const todos = await fetch('./todos.json')
    .then((response) => {
      if(response.status === 200){
        return response.json();
      }
      throw new Error(`${response.status} - ${response.statusText}`);
    })
    setTodos(todos);
  };

  useEffect(() => {
    fetchData()
  }, []);


  return (
    <div className='container'>
      <header>
        <h1>My TODOs</h1>
      </header>
      <div id="grid">
        {todos.map(todo => {
          const completed = todo.tasks.reduce((acc, curr) => {
            return curr.completed ? (acc + 1) : acc;
          }, 0);
          return <Todo 
            id={todo.id} 
            title={todo.title} 
            tasks={todo.tasks} 
            completed={completed} 
          />
        })}
      </div>
    </div>
  )
}

export default Todos