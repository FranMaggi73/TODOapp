import api from '../../../api/api.js';
import Modal from '../../../modal/modal-template.js';
import './new-todo.css'

function NewTodoButton(props) {
  const success = async () => {
    props.modal(null);

    const title = document.querySelector('.modal-input').value;
    await api.createTodo(title);
    props.update();
  };

  const showModal = () => {
    props.modal(<Modal 
      key='new-todo-modal'
      close={() => props.modal(null)} 
      title='New TODO'
      onSuccess={success}
      successMessage='Create TODO'
      Content={
        <input autoFocus placeholder="TODO's name..." type='text' className='modal-input'/>
      }
    />);
  }

  if (window.location.pathname === '/') {
    return (
      <div key='new-todo-button' className='new-todo' onClick={() => showModal()}>
        <p>+</p>
      </div>
    )
  }
}

export default NewTodoButton