import './App.css';
import Todos from './todos/todos';
import Sidebar from './sidebar/sidebar.js'
import NewTodoButton from './modals/new-todo/new-todo';
import Searchbox from './searchbox/searchbox';
import filters from './sidebar/filters';
import { useState } from 'react';

function App() {
  const [filter, setFilter] = useState(() => filters.All)

  function changeFilter(selectedFilter) {
    setFilter(() => selectedFilter)
  }

  return [
    <Searchbox key='searchbox'/>,
    <Sidebar key='sidebar' filters={filters} filterChange={changeFilter}/>,
    <Todos key='todos' selectedFilter={filter}/>,
    <NewTodoButton key='newtodo'/>
  ]
}

export default App;
