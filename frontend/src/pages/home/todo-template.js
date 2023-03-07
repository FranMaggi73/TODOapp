import React from 'react';

import './todo-template.css';
import Modal from '../../modal/modal-template';

export default function Todo(props) {
  const success = async () => {
    props.modal(null);
    await fetch(`/todos/delete/${props.id}`, {
      method: 'DELETE'
    });
    props.update();
  };

  const showModal = () => {
    props.modal(<Modal 
      key='new-todo-modal'
      close={() => props.modal(null)} 
      title={`Delete TODO: ${props.title}`}
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