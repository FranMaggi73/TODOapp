import React, { useState, useEffect } from 'react';

import './todos.css';
import NewTodoButton from '../modals/new-todo/new-todo';
import Modal from '../modals/modal-template';

function Todos(props) {
  const [todos, setTodos] = useState([]);
  const filter = props.selectedFilter;

  const fetchData = async () => {
    const todos = await fetch('/todos')
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

  const completedTasks = (todo) => todo.tasks.reduce((acc, curr) => curr.completed ? acc + 1 : acc, 0);

  return [
    <NewTodoButton key='newtodo' modal={props.modal} update={fetchData}/>,
    <div key="todos" className='container'>
      <header>
        <h1>My TODOs</h1>
      </header>
      <div id="grid">
        {todos.filter(filter).map(todo => {
          const completed = completedTasks(todo);
          const empty = todo.tasks.length === 0;

          return <Todo 
            click={e => (window.location.href = `/edit?${todo.id}`)}
            modal={props.modal}
            key={todo.id}
            id={todo.id} 
            empty={empty}
            title={todo.title} 
            tasks={todo.tasks} 
            completed={completed}
            update={fetchData}
            progress={empty ? 'No tasks' : `${completed}/${todo.tasks.length} Tasks`} 
          />
        })}
      </div>
    </div>
  ]
};

function Todo(props) {
  const success = async () => {
    props.modal(null);
    await fetch(`/todos/delete/${props.id}`, {
      method: 'DELETE'
    });
    await props.update();
  };

  const showModal = () => {
    props.modal(<Modal 
      key='new-todo-modal'
      close={() => props.modal(null)} 
      title={`Delete: ${props.title}`}
      onSuccess={success}
      successMessage='Confirm'
      Content={<h1 className='modal-text'>Are you sure?</h1>}
    />)
  };

  return (
    <div className='todo' onClick={props.click}>
      <div className='todo-options' onClick={e => {
          e.stopPropagation();
          showModal();
        }}>
        <p>...</p>
      </div>
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
  );
};



export default Todos