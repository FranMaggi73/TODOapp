import React from "react";
import { Link } from "react-router-dom";
import Searchbox from "../searchbox/searchbox";
import './edit.css';
import { useState, useEffect } from "react";

export default function Edit() {
  const [todo, setTodo] = useState([]);
  const [tasks, setTasks] = useState([]);

  const id = window.location.search.slice(1)

  const fetchData = async () => {
    const todo = await fetch(`/todos/${id}`)
    .then((response) => {
      if(response.status === 200){
        return response.json();
      }
      throw new Error(`${response.status} - ${response.statusText}`);
    })
    setTodo(todo);
    setTasks(todo.tasks);
  };

  useEffect(() => {
    fetchData()
  });

  async function deleteTask(todoId, taskId) {
    await fetch(`/todos/delete-task/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: todoId })
    })
    fetchData();
  };

  async function newTask(id) {
    const input = document.querySelector('.new-task-input');
    await fetch(`/todos/create-task/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: input.value, completed: false })
    });
    fetchData();
  };

  async function checkTasks(id, taskId, value) {
    await fetch(`/todos/check-task/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ taskId, completed: value })
    });
    fetchData();
  }

  return (
    <>
      <Link to='/' draggable='false'>
        <div id="go-back"><i className="fa-solid fa-arrow-left"></i></div>
      </Link>
      <Searchbox key='searchbox'/>
      <div id="todo-edit">
        <h1>{todo.title}</h1>
        {tasks.map((task) => {
          return (
            <div key={task.title} className='todo-task'>
              <input 
                type='checkbox' 
                className="checkbox"  
                defaultChecked={task.completed}
                onChange={e => {
                  checkTasks(id, task.id, e.target.checked);
                }}
              />
              <p>{task.title}</p>
              <div className='task-options' onClick={(e) => {
                  e.stopPropagation();
                  deleteTask(todo.id, task.id)
                }}>
                <p>...</p>
              </div>
            </div>
          )
        })}
        <div className="todo-task">
          <button className="new-task-submit" onClick={() => newTask(id)}>+</button>
          <p className="add-task">Add task</p>
          <input 
            placeholder="title..." 
            className="new-task-input"
          />
        </div>
      </div>
    </>
  )
}