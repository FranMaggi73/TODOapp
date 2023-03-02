import './App.css';
import Todos from './todos/todos';
import Sidebar from './sidebar/sidebar.js'
import NewTodoButton from './modals/new-todo/new-todo';

function App() {
  return [
    <Sidebar />,
    <Todos />,
    <NewTodoButton />
  ]
}

export default App;
