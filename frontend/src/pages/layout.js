import React from 'react';
import { Outlet, Link } from 'react-router-dom';

import Searchbox from '../searchbox/searchbox';
import './layout.css'

export default function Layout(props) {
  return (
    <>
      <header id="top-bar">
        <Link to='/' draggable='false'><h1>TODOapp</h1></Link>
        <div className='user' onClick={props.clearToken}>
          <p>{props.name}</p>
        </div>
      </header>
      <Searchbox key='searchbox'/>
      <Outlet />
    </>
  );
};