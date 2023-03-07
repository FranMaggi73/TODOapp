import React from "react";

import api from "../../api/api";

import './edit.css';

export default function Task({
  id, task, update
}){
  return (
    <div key={task._id} className='todo-task' onClick={e => {
      const input = e.target.firstChild;
      input.click()
    }}>
      <input 
        type='checkbox' 
        className="checkbox"  
        defaultChecked={task.completed}
        onClick={e => e.stopPropagation()}
        onChange={ e => {
          api.updateTask(id, task, { completed: !task.completed });
        }}
      />
      <p>{task.title}</p>
      <div className='task-options' onClick={ e => {
          e.stopPropagation();
          api.deleteTask(id, task._id, update);
        }}>
        <p>...</p>
      </div>
    </div>
  )
}