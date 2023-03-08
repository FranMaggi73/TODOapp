import React from "react";

import api from "../../api/api";

import './edit.css';

export default function Task({
  id, task, todo, setTodo
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
          api.updateTask(id, task, setTodo, { completed: !task.completed });
        }}
      />
      <p>{task.title}</p>
      <div className='task-options' onClick={ e => {
          e.stopPropagation();
          api.deleteTask(id, task._id, setTodo);
          delete todo.tasks[todo.tasks.indexOf(task)];
          setTodo({...todo});
        }}>
        <p>...</p>
      </div>
    </div>
  )
}