import { useState } from 'react';
import Modal from '../modal-template';
import './new-todo.css'

function NewTodoButton() {
  const [hideModal, setHideModal] = useState(true);
  const [opacity, setOpacity] = useState(1);

  const showModal = () => {
    setHideModal(false);
    setTimeout(() => {
      setOpacity(1)
    }, 0);
  }

  const closeModal = () => {
    setOpacity(0)
    setTimeout(() => {
      setHideModal(true);
    }, 100);
  }

  const success = () => {
    // Add TODO's name validation
    //
    // const input = document.querySelector('.modal-input');
    // const valid = isValidInput(input.value)
    // if(valid) {
      // fetch('../todo/create', {
      //   method: 'POST',
      //   body: JSON.stringify({ "title": input.value })
      // })
    // }
    closeModal();
  }

  return [
    <div className='new-todo' onClick={showModal}>
      <p>+</p>
    </div>,
    <Modal 
      opacity={opacity}
      hidden={hideModal}
      close={closeModal}
      title='New TODO'
      onSuccess={success}
      successMessage='Create TODO'
      Content={<input placeholder="TODO's name..." type='text' className='modal-input'></input>}
    />
  ]
}

export default NewTodoButton