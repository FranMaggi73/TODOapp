import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Home from './pages/home';
import Layout from './pages/layout';
import Edit from './pages/edit';
import Login from './pages/login';

function App() {
  const validateCookie = async () => {
    const { user } = await fetch('/cookie')
    .then((res) => {
      return res.json()
    })
    .catch((err) => {
      return
    })

    if(user) {
      setToken(true)
      setName(user[0].toUpperCase());
      return
    }

    setToken(false);
  }
  const [token, setToken] = useState(validateCookie());
  const [name, setName] = useState('');
  
  const login = (user) => {
    setToken(true);
    setName(user[0].toUpperCase());
  };

  const clearToken = async () => {
    await fetch('/signout')
    setToken(null)
  };

  useEffect(() => {
    validateCookie()
  }, [])

  if (!token) return <Login login={login} />;
  if (typeof(token) === typeof({})) return;

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout clearToken={clearToken} name={name}/>}>
          <Route index element={<Home />} />
          <Route path='/edit' element={<Edit/> } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
