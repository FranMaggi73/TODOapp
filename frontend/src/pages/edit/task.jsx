import React from "react";

import api from "../../api/api";

import './edit.css';

export default function Task({
  id, task, todo, setTodo, setTodos
}){
  return (
    <div key={task._id} className='todo-task' onClick={e => {
      const input = e.target.firstChild;
      if(input) input.click()
    }}>
      <input 
        type='checkbox' 
        className="checkbox"  
        defaultChecked={task.completed}
        onClick={e => e.stopPropagation()}
        onChange={ e => {
          task.completed = !task.completed;
          api.updateTodo(todo, setTodo);
          api.getTodos().then(todos => setTodos(todos));
        }}
      />
      <p>{task.title}</p>
      <div className='task-options' onClick={ e => {
          e.stopPropagation();
          todo.tasks = todo.tasks.filter(currTask => currTask._id !== task._id);
          api.updateTodo({...todo}, setTodo);
          api.getTodos().then(todos => setTodos(todos));
          setTodo({...todo})
        }}>
        <p>...</p>
      </div>
    </div>
  )
}