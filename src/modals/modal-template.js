import React from 'react';
import './modal.css';

function Modal(props) {
  return (
    <div className='modal' hidden={props.hidden}>
      <div className='modal-body' style={{opacity: props.opacity}}>
        <span className='close' onClick={props.close}>X</span>
        <p className='modal-title'>{props.title}</p>
        {props.Content}
        <button className='modal-success' onClick={props.onSuccess}>{props.successMessage}</button>
      </div>
    </div>
  )
}

export default Modal