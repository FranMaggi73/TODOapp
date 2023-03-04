import React from 'react';
import { Outlet, Link } from 'react-router-dom';

import Searchbox from '../searchbox/searchbox';

export default function Layout() {
  return (
    <>
      <header id="top-bar">
        <Link to='/' draggable='false'><h1>TODOapp</h1></Link>
      </header>
      <Searchbox key='searchbox'/>
      <Outlet />
    </>
  );
};