import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import View from './pages/view';
import Layout from './pages/layout';
import Edit from './pages/edit';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<View />} />
          <Route path='/edit/' element={<Edit/> } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
