import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { addItem, editItem, deleteItem } from "../Utility/methods";

const ToDoListContext = createContext();

const BASE_URL = "http://localhost:3000/toDoList";

const ToDoListProvider = ({ children }) => {
  const [toDoList, setToDoList] = useState([]);

  useEffect(() => {
    fetch(BASE_URL)
      .then((response) => response.json())
      .then((data) => setToDoList(data));
  }, []);

  return (
    <ToDoListContext.Provider
      value={{
        toDoList,
        addItem: addItem(BASE_URL, toDoList, setToDoList),
        editItem: editItem(BASE_URL, toDoList, setToDoList),
        deleteItem: deleteItem(BASE_URL, toDoList, setToDoList),
      }}>
      {children}
    </ToDoListContext.Provider>
  );
};

ToDoListProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ToDoListProvider, ToDoListContext };
