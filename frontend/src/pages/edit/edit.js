import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import api from "../../api/api.js";
import Modal from "../../modal/modal-template.js";
import Task from "./task.js";
import './edit.css';

export default function Edit() {
  const [todo, setTodo] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [showTaskMenu, setShowTaskMenu] = useState(false);
  const [currModal, setModal] = useState(null);

  const toggleTaskMenu = (e) => {
    setShowTaskMenu(!showTaskMenu);
    const interval = setInterval(() => {
      window.scrollTo({ top: (document.body.scrollHeight)})
    }, 1);
    setTimeout(() => {
      clearInterval(interval);
    }, 300);
  };

  const id = window.location.search.slice(1);

  const fetchData = async () => {
    const todo = await api.getTodo(id);
    setTodo(todo);
    setTasks(todo.tasks);
  };

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, []);

  const success = async () => {
    setModal(null);
    await api.deleteTodo(id);
    window.location.href = '/';
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
        <h1>{todo.title}</h1>
        {tasks.map((task) => {
          return <Task 
            id={id}
            key={task._id}
            task={task}
            update={setTasks}
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
            api.newTask(id, setTasks);
          }}>+</button>
          <p>Add task</p>
          <input 
            placeholder="title..." 
            className="new-task-input"
            onKeyUp={e => {
              if(e.keyCode === 13) {
                api.newTask(id, fetchData);
              }
            }}
          />
          <button className="new-task-confirm" onClick={() => api.newTask(id, fetchData)}>Create Task</button>
          <button className="new-task-cancel" onClick={toggleTaskMenu}>Cancel</button>
        </div>
      </div>
    </>
  )
}