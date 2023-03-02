import './App.css';
import Todos from './todos/todos';
import Sidebar from './sidebar/sidebar.js'
import NewTodoButton from './modals/new-todo/new-todo';
import Searchbox from './searchbox/searchbox';

function App() {
  return [
    <Searchbox />,
    <Sidebar />,
    <Todos />,
    <NewTodoButton />
  ]
}

export default App;
