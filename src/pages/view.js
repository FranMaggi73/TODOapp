import React from "react";
import { useState } from "react";
import Searchbox from "../searchbox/searchbox";
import Sidebar from "../sidebar/sidebar";
import Todos from "../todos/todos";

import filters from "../sidebar/filters";

export default function View() {
  const [filter, setFilter] = useState(() => filters.All);
  const [currModal, setModal] = useState(null);

  function changeFilter(selectedFilter) {
    setFilter(() => selectedFilter);
  };

  function updateModal(modal) {
    setModal(modal);
  };

  return (
    <>
      <label key='modal'>
        {currModal}
      </label>
      <Searchbox key='searchbox'/>
      <Sidebar key='sidebar' filters={filters} filterChange={changeFilter}/>
      <Todos key='todos' modal={updateModal} selectedFilter={filter}/>
    </>
  )
}