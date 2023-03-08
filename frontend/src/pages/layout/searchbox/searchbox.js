import './searchbox.css'
import { useEffect, useState } from 'react';
import api from '../../../api/api';

function Searchbox() {
  const [showMenu, setShowMenu] = useState('none');
  const [todos, setTodos] = useState([]);
  const [results, setResults] = useState([]);

  const fetchData = async () => {
    const todos = await api.getTodos();
    setTodos(todos);
  };

  useEffect(() => {
    fetchData()
  }, []);

  const display = () => {
    fetchData();
    setShowMenu('flex')
  };
  const hide = () => setShowMenu('none');

  const search = e => {
    setResults(getResults(e.target.value.toLowerCase().trim(), todos).splice(0));
  };

  return (
    <div className="search-box">
      <i className="fa-solid fa-magnifying-glass"></i>
      <div className="dropdown">
        <input 
          type="text" 
          placeholder="Search..."
          onFocus={display}
          onBlur={hide}
          onKeyUp={search}
        />
        <div 
          className="dropdown-menu"
          style={{display: showMenu}}
        >
          {results.map((result) => {
            return (
              <div 
                key={result._id}
                className='row' 
                onMouseDown={e => (window.location.href = `/edit?${result._id}`)}
              >
                {result.title}
              </div>
            )
          })}
        </div>
      </div>
    </div>  
  )
}

function getResults(value, todos){
  const results = [];
  if(value === "") return [];

  for(let { title, _id } of todos){
    if(title.toLowerCase().indexOf(value) === -1){
      continue;
    }
    results.push({ title, _id });
  }
  return results;
};

export default Searchbox