import './sidebar.css';
import {useState} from 'react';

function Sidebar(props) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    isOpen === true ? setIsOpen(false) : setIsOpen(true);
  };

  const filters = []
  for(let filter in props.filters) {
    filters.push({ name: filter, filter: props.filters[filter]})
  }

  return [
    <div key="burger" id="burger" onClick={toggleSidebar}>☰</div>,
    <aside key='sidebar' id='sidebar' className={isOpen === true ? '' : 'hidden'}>
      <div id='options'>
        <div id='filters'>
          {filters.map((option) => {
            return (
              <p 
              key={option.name} 
              onClick={() => {
                props.filterChange(option.filter)
              }}
              className={`option ${isOpen === true ? '' : 'hidden'}`}>
                {option.name}
              </p>
            )
          })}
        </div>
      </div>
    </aside>
  ];
}

export default Sidebar