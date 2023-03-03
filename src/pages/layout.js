import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <header id="top-bar">
        <Link to='/' draggable='false'><h1>TODOapp</h1></Link>
      </header>
      <Outlet />
    </>
  );
};