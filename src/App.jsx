import "./App.css";
import Routes from "./Routes/Routes";
import { ToDoListProvider } from "./assets/ToDoListContext";
// import ToDoList from "./assets/ToDoList";

function App() {
  return (
    <ToDoListProvider>
      <Routes />
    </ToDoListProvider>
  );
}

export default App;
