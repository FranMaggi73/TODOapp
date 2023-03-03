import './App.css';
import { useState } from 'react';

import Todos from './todos/todos';
import Sidebar from './sidebar/sidebar.js'
import NewTodoButton from './modals/new-todo/new-todo';
import Searchbox from './searchbox/searchbox';
import Header from './header/header';
import filters from './sidebar/filters';

function App() {
  const [filter, setFilter] = useState(() => filters.All)

  function changeFilter(selectedFilter) {
    setFilter(() => selectedFilter)
  }

  return [
    <Header />,
    <Searchbox key='searchbox'/>,
    <Sidebar key='sidebar' filters={filters} filterChange={changeFilter}/>,
    <Todos key='todos' selectedFilter={filter}/>,
    <NewTodoButton key='newtodo'/>
  ]
}

export default App;
