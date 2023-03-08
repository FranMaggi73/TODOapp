import React from 'react';

import './todo-template.css';
import Modal from '../../modal/modal-template';
import api from '../../api/api';
import { Link } from 'react-router-dom';

export default function Todo(props) {
  const todo = props.todo;
  const completed = completedTasks(todo);
  const empty = todo.tasks.length === 0;

  const success = async () => {
    props.modal(null);
    delete props.todos[props.todos.indexOf(todo)];
    api.deleteTodo(todo._id, props.setTodos);
  };

  const showModal = () => {
    props.modal(<Modal 
      key='new-todo-modal'
      close={() => props.modal(null)} 
      title={`Delete TODO: ${todo.title}`}
      onSuccess={success}
      successMessage='Confirm'
      Content={<h1 className='modal-text'>Are you sure?</h1>}
    />)
  };

  return (
    <Link to={todo._id ? `/edit?${todo._id}` : '/'} draggable='false' className='todo'>
      <div className='todo-options' onClick={e => {
          e.preventDefault();
          showModal();
        }}>
        <p>...</p>
      </div>
      <div className='todo-header'>
        <h1>{todo.title}</h1>
          <div className='bar'>
            <progress 
              value={completed} 
              max={todo.tasks.length} 
              className='progress-bar'
              style={{display: empty ? 'none' : 'auto'}}
              >
            </progress>
          </div>
      </div>
      <div className='todo-body'>
        <div className='todo-info todo-progress'>
          <p>{empty ? 'No tasks' : `${completed}/${todo.tasks.length} Tasks`}</p>
        </div>
        <div className='todo-info todo-date'></div>
        <div className='todo-info todo-type'></div>
      </div>
    </Link>
  );
};

const completedTasks = todo => {
  return todo.tasks.reduce((acc, curr) => curr.completed ? acc + 1 : acc, 0);
};