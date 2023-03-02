import './sidebar.css';
import {useState} from 'react';

function Sidebar() {
  const toggler = document.querySelector('#toggler');
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    isOpen === true ? setIsOpen(false) : setIsOpen(true);
  };

  toggler.addEventListener('change', e => {
    toggleSidebar();
  });

  return (
    <aside id='sidebar' className={isOpen === true ? '' : 'hidden'}>
    </aside>
  );
}

export default Sidebar