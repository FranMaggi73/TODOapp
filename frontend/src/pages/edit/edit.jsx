import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../../api/api.js";
import Modal from "../../modal/modal-template.jsx";
import Task from "./task.jsx";
import './edit.css';

export default function Edit({ todos, setTodos }) {
  const id = window.location.search.slice(1);
  const [todo, setTodo] = useState(todos.length ? todos.find(todo => todo._id === id) : api.getTodo(id));
  const [showTaskMenu, setShowTaskMenu] = useState(false);
  const [currModal, setModal] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.getTodos().then(todos => setTodos(todos));
  }, []);

  const toggleTaskMenu = (e) => {
    setShowTaskMenu(!showTaskMenu);
    const interval = setInterval(() => {
      window.scrollTo({ top: (document.body.scrollHeight)})
    }, 1);
    setTimeout(() => {
      clearInterval(interval);
    }, 300);
  };
  
  const success = async () => {
    setModal(null);
    api.deleteTodo(id, setTodos, navigate);
  };
  
  const showModal = () => {
    setModal(<Modal 
      key='new-todo-modal'
      close={() => setModal(null)} 
      title={`Delete TODO: ${todo.title}`}
      onSuccess={success}
      successMessage='Confirm'
      Content={<h1 className='modal-text'>Are you sure?</h1>}
    />)
  };

  if(!todo) navigate('/');
  return (
    <>
      <label key='modal'>
        {currModal}
      </label>
      <Link to='/' draggable='false'>
        <div id="go-back"><i className="fa-solid fa-arrow-left"></i></div>
      </Link>
      <div id="todo-edit">
        <p className='delete-todo' onClick={showModal}>x</p>
        <h1>{todo?.title}</h1>
        {todo.tasks?.map((task) => {
          return <Task 
            id={id}
            key={task._id}
            task={task}
            todo={todo}
            setTodo={setTodo}
            setTodos={setTodos}
          />
        })}
        <div 
          className={`new-task ${showTaskMenu ? 'menu' : ''}`} 
          onClick={showTaskMenu ? () => {} : (e) => {
            toggleTaskMenu();
            setTimeout(() => {
              e.target.querySelector('input').focus();
            }, 300);
          }}
        >
          <button 
          className="new-task-submit" 
          onClick={() => {
            api.newTask(id, todo, setTodo);
            api.getTodos().then(todos => setTodos(todos));
          }}>+</button>
          <p>Add task</p>
          <input 
            placeholder="title..." 
            className="new-task-input"
            onKeyUp={e => {if(e.keyCode === 13) {
              api.newTask(id, todo, setTodo);
              api.getTodos().then(todos => setTodos(todos));
            }}}
          />
          <button className="new-task-confirm" onClick={() => {
            api.newTask(id, todo, setTodo);
            api.getTodos().then(todos => setTodos(todos));
          }}>Create Task</button>
          <button className="new-task-cancel" onClick={toggleTaskMenu}>Cancel</button>
        </div>
      </div>
    </>
  )
}