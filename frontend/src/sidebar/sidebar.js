import './sidebar.css';
import {useState} from 'react';

function Sidebar(props) {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const filtersKeys = Object.keys(props.filters);

  return [
    <div key="burger" id="burger" onClick={toggleSidebar}>☰</div>,
    <aside key='sidebar' id='sidebar' className={isOpen ? '' : 'hidden'}>
      <div id='options'>
        <div id='filters'>
          {filtersKeys.map((key) => {
            return (
              <p 
              key={key} 
              onClick={() => {
                props.filterChange(props.filters[key])
              }}
              className={`option ${isOpen ? '' : 'hidden'}`}>
                {key}
              </p>
            )
          })}
        </div>
      </div>
    </aside>
  ];
}

export default Sidebar