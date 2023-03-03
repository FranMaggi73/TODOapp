import './todos.css';
import React, { useState, useEffect } from 'react';

function Todo(props) {
  return (
    <div className='todo' onClick={e => (window.location.href = `/edit/${props.id}`)}>
      <div className='todo-header'>
        <h1>{props.title}</h1>
          <div className='bar'>
            <progress 
              value={props.completed} 
              max={props.tasks.length} 
              className='progress-bar'
              style={{display: props.empty ? 'none' : 'auto'}}
              >
            </progress>
          </div>
      </div>
      <div className='todo-body'>
        <div className='todo-info todo-progress'><p>{props.progress}</p></div>
        <div className='todo-info todo-date'></div>
        <div className='todo-info todo-type'></div>
      </div>
    </div>
  )
}

function Todos(props) {
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

  if (window.location.pathname === '/') {
    return (
      <div className='container'>
        <header>
          <h1>My TODOs</h1>
        </header>
        <div id="grid">
          {todos.filter(props.selectedFilter).map(todo => {
            const completed = todo.tasks.reduce((acc, curr) => {
              return curr.completed ? (acc + 1) : acc;
            }, 0);

            const empty = todo.tasks.length === 0 ? true : false;

            return <Todo 
              key={todo.id}
              id={todo.id} 
              empty={empty}
              title={todo.title} 
              tasks={todo.tasks} 
              completed={completed}
              progress={empty ? 'No tasks' : `${completed}/${todo.tasks.length} Tasks`} 
            />
          })}
        </div>
      </div>
    )
  }
}

export default Todos