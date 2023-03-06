import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Home from './pages/home';
import Layout from './pages/layout';
import Edit from './pages/edit';
import Login from './pages/login';

function App() {
  const validateCookie = async () => {
    const {token} = await fetch('/cookie')
    .then((res) => {
      return res.json()
    });

    if(token) {
      setName(token[0].toUpperCase());
    }
    return token
  }

  const [token, setToken] = useState(validateCookie());
  const [name, setName] = useState('');
  
  const login = (token) => {
    setToken(token);
    setName(token[0].toUpperCase());
  };
  const clearToken = () => setToken(null);

  useEffect(() => {
    validateCookie()
  }, [])

  if (!token) return <Login login={login} />;

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
