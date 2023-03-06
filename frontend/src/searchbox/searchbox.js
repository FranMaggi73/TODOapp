import './searchbox.css'
import { useEffect, useState } from 'react';

function Searchbox() {
  const [showMenu, setShowMenu] = useState('none');
  const [todos, setTodos] = useState([]);
  const [results, setResults] = useState([]);

  const fetchData = async () => {
    const todos = await fetch('/todos')
    .then((response) => {
      if(response.status === 200){
        return response.json();
      }
      throw new Error(`${response.status} - ${response.statusText}`);
    })
    setTodos(Object.entries(todos));
  };

  useEffect(() => {
    fetchData()
  }, []);

  const display = () => setShowMenu('flex');
  const hide = () => setShowMenu('none');

  const search = (e) => {
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
                key={result.id}
                className='row' 
                onMouseDown={e => (window.location.href = `/edit?${result.id}`)}
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
  if(value === "") {
    return []
  }

  for(let [id, { title }] of todos){
    if(title.toLowerCase().indexOf(value) === -1){
      continue;
    }
    
    results.push({ title, id });
  }

  return results
};

export default Searchbox