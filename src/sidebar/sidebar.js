import './sidebar.css';
import {useState} from 'react';
import Todos from '../todos/todos';

function Sidebar() {
  const toggler = document.querySelector('#toggler');
  const [isOpen, setIsOpen] = useState(true);

  const ToggleSidebar = () => {
    isOpen === true ? setIsOpen(false) : setIsOpen(true);
  };

  toggler.addEventListener('change', e => {
    ToggleSidebar();
  });

  return (
    <aside id='sidebar' className={isOpen === true ? '' : 'hidden'}>
    </aside>
  );
}

export default Sidebar