import React, { useEffect, useState } from 'react';

import './modal.css';

function Modal(props) {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    setOpacity(1);
  }, []);

  function fadeOut() {
    setOpacity(0);
  };

  return (
    <div className='modal' hidden={props.hidden} onClick={props.close}>
      <div 
        className='modal-body' 
        style={{ opacity }} 
        onClick={e => e.stopPropagation()}
        onKeyUp={e => {
          if(e.keyCode === 13) props.onSuccess()
        }}
        >
        <span className='close' onClick={() => {
          fadeOut();
          setTimeout(() => {
            props.close()
          }, 100)
        }}>X</span>
        <p className='modal-title'>{props.title}</p>
        {props.Content}
        <footer>
          <button className='modal-cancel' onMouseUp={props.close}>Cancel</button>
          <button className='modal-success' onClick={props.onSuccess}>{props.successMessage}</button>
        </footer>
      </div>
    </div>
  )
}

export default Modal