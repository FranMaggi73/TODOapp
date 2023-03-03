import Modal from '../modal-template';
import './new-todo.css'

function NewTodoButton(props) {
  const success = async () => {
    props.modal(null);

    const input = document.querySelector('.modal-input');
    await fetch('/todos/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: input.value })
    });
    props.update()
  };

  const showModal = () => {
    props.modal(<Modal 
      key='new-todo-modal'
      close={() => props.modal(null)} 
      title='New TODO'
      onSuccess={success}
      successMessage='Create TODO'
      Content={<input placeholder="TODO's name..." type='text' className='modal-input'/>}
    />);
  }

  if (window.location.pathname === '/') {
    return (
      <div key='new-todo-button' className='new-todo' onClick={() => {
        showModal();
      }}>
        <p>+</p>
      </div>
    )
  }
}

export default NewTodoButton