import React from "react";
import { useState } from "react";

import Sidebar from "../../sidebar/sidebar";
import filters from "../../sidebar/filters";
import sortBys from "../../sidebar/sortBy";
import NewTodoButton from "./new-todo/new-todo";
import Todo from "./todo-template";

import './home.css'

export default function Home(props) {
  const [filter, setFilter] = useState(() => filters.All);
  const [sortBy, setSortBy] = useState(() => () => 0);
  const [currModal, setModal] = useState(null);

  const changeFilter = (selectedFilter) => setFilter(() => selectedFilter);
  const changeSortBy = (selectedSortBy) => setSortBy(() => selectedSortBy);

  return (
    <>
      <label key='modal'>
        {currModal}
      </label>
      <Sidebar 
        filters={filters} 
        filterChange={changeFilter}
        sortBy={sortBys}
        sortByChange={changeSortBy}
      />
      <NewTodoButton todos={props.todos} modal={setModal} setTodos={props.setTodos}/>
      <div key="todos" className='container'>
        <header>
          <h1>My TODOs</h1>
        </header>
        <div id="grid">
          {props.todos?.filter(filter).sort(sortBy).map((todo) => {
            return <Todo 
              todo={todo}
              todos={props.todos}
              setTodos={props.setTodos}
              modal={setModal}
              key={todo._id}
            />
          })}
        </div>
      </div>
    </>
  );
};