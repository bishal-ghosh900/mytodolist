import "./App.css";
import Heading from "./Heading";
import ToDoList from "./ToDoList";

function App() {
  return (
    <div className="app">
      <Heading>
        <h1>MyToDoList</h1>
      </Heading>
      <ToDoList />
    </div>
  );
}

export default App;
