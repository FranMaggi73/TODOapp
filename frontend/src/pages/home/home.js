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
    setTodos(todos);
  };

  useEffect(() => {
    fetchData()
  }, []);

  const changeFilter = (selectedFilter) => setFilter(() => selectedFilter);
  const changeSortBy = (selectedSortBy) => setSortBy(() => selectedSortBy);
  const updateModal = (modal) => setModal(modal);

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
      <NewTodoButton key='newtodo' modal={updateModal} update={setTodos}/>
      <div key="todos" className='container'>
        <header>
          <h1>My TODOs</h1>
        </header>
        <div id="grid">
          {todos.filter(filter).sort(sortBy).map((todo) => {
            const completed = completedTasks(todo);
            const empty = todo.tasks.length === 0;
          
            return <Todo 
              click={e => (window.location.href = `/edit?${todo._id}`)}
              modal={updateModal}
              key={todo._id}
              id={todo._id} 
              empty={empty}
              title={todo.title} 
              tasks={todo.tasks} 
              completed={completed}
              update={fetchData}
              progress={empty ? 'No tasks' : `${completed}/${todo.tasks.length} Tasks`} 
            />
          })}
        </div>
      </div>
    </>
  );
};

const completedTasks = todo => {
  return todo.tasks.reduce((acc, curr) => curr.completed ? acc + 1 : acc, 0);
};