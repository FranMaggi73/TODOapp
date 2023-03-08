import './searchbox.css'
import { useEffect, useState } from 'react';
import api from '../../../api/api';
import { Link } from 'react-router-dom';

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
          onKeyDown={e => {
            if (e.key === 'Enter') {
              console.log(e)
              console.log('enter')
            }
          }}
        />
        <div 
          className="dropdown-menu"
          style={{display: showMenu}}
        >
          {results.map((result) => {
            return (
              <Link
                to={`/edit?${result._id}`}
                key={result._id}
                className='row' 
              >
              {result.title}
              </Link>
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