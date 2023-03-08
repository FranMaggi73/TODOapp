import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Home from './pages/home/home';
import Layout from './pages/layout/layout';
import Edit from './pages/edit/edit';
import Login from './pages/login/login';
import { useCookie } from './useHooks';
import api from './api/api';

function App() {
  const { token, name, loading } = useCookie();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (token) api.getTodos().then((todos) => setTodos(todos));
  }, [token]);
  
  if (loading) return;
  if (!token) return <Login />;
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout name={name}/>}>
          <Route index element={<Home todos={todos} setTodos={setTodos}/>}/>
          <Route path='/edit' element={<Edit todos={todos} setTodos={setTodos} />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
