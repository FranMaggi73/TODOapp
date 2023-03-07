import React from "react";

import api from "../../api/api";

import './edit.css';

export default function Task({
  id, taskId, task, update
}){
  return (
    <div key={taskId} className='todo-task' onClick={e => {
      const input = e.target.firstChild;
      input.click()
    }}>
      <input 
        type='checkbox' 
        className="checkbox"  
        defaultChecked={task.completed}
        onClick={e => e.stopPropagation()}
        onChange={ e => {
          api.checkTasks(id, taskId, e.target.checked, update);
        }}
      />
      <p>{task.title}</p>
      <div className='task-options' onClick={ e => {
          e.stopPropagation();
          api.deleteTask(id, taskId, update);
        }}>
        <p>...</p>
      </div>
    </div>
  )
}