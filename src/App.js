import './App.css';
import Todos from './todos/todos';
import Sidebar from './sidebar/sidebar.js'

function App() {
  return [
    <Sidebar />,
    <Todos />
  ]
}

export default App;
