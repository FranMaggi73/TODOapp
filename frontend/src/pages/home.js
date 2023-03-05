import React from "react";
import { useState } from "react";

import Sidebar from "../sidebar/sidebar";
import Todos from "../todos/todos";
import filters from "../sidebar/filters";
import sortBys from "../sidebar/sortBy";

export default function Home() {
  const [filter, setFilter] = useState(() => filters.All);
  const [sortBy, setSortBy] = useState(() => () => 0);
  const [currModal, setModal] = useState(null);

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
      <Todos 
        key='todos' 
        modal={updateModal} 
        selectedFilter={filter}
        selectedSortBy={sortBy}
      />
    </>
  );
};