import React from "react";
import { useState, useEffect } from "react";

import Sidebar from "../../sidebar/sidebar";
import filters from "../../sidebar/filters";
import sortBys from "../../sidebar/sortBy";
import api from "../../api/api";
import NewTodoButton from "./new-todo/new-todo";
import Todo from "./todo-template";

import './home.css'

export default function Home() {
  const [filter, setFilter] = useState(() => filters.All);
  const [sortBy, setSortBy] = useState(() => () => 0);
  const [currModal, setModal] = useState(null);
  const [todos, setTodos] = useState([]);

  const fetchData = async () => {
    const todos = await api.getTodos();
    setTodos(Object.entries(todos));
  };

  useEffect(() => {
    fetchData()
  }, []);

  function changeFilter(selectedFilter) {
    setFilter(() => selectedFilter);
  };
  
  function changeSortBy(selectedSortBy) {
    setSortBy(() => selectedSortBy);
  };

  function updateModal(modal) {
    setModal(modal);
  };

  return (
    <>
      <label key='modal'>
        {currModal}
      </label>
      <Sidebar 
        key='sidebar' 
        filters={filters} 
        filterChange={changeFilter}
        sortBy={sortBys}
        sortByChange={changeSortBy}
      />
      <NewTodoButton key='newtodo' modal={updateModal} update={fetchData}/>
      <div key="todos" className='container'>
        <header>
          <h1>My TODOs</h1>
        </header>
        <div id="grid">
          {todos.filter(filter).sort(sortBy).map(([id, todo]) => {
            const completed = completedTasks(todo);
            const empty = Object.keys(todo.tasks).length === 0;
          
            return <Todo 
              click={e => (window.location.href = `/edit?${id}`)}
              modal={updateModal}
              key={id}
              id={id} 
              empty={empty}
              title={todo.title} 
              tasks={Object.values(todo.tasks)} 
              completed={completed}
              update={fetchData}
              progress={empty ? 'No tasks' : `${completed}/${Object.keys(todo.tasks).length} Tasks`} 
            />
          })}
        </div>
      </div>
    </>
  );
};

const completedTasks = todo => {
  const tasks = Object.values(todo.tasks);
  return tasks.reduce((acc, curr) => curr.completed ? acc + 1 : acc, 0);
};