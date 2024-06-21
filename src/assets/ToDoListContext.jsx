import { createContext, useState } from "react";
import PropTypes from "prop-types";
const ToDoListContext = createContext();

const ToDoListProvider = ({ children }) => {
  const [toDoList, setToDoList] = useState([]);

  const addItem = (newItem) => {
    setToDoList((prevList) => [...prevList, newItem]);
  };

  const editItem = (updatedItem) => {
    setToDoList((prevList) =>
      prevList.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const deleteItem = (itemId) => {
    setToDoList((prevList) => prevList.filter((item) => item.id !== itemId));
  };

  return (
    <ToDoListContext.Provider
      value={{ toDoList, addItem, editItem, deleteItem }}>
      {children}
    </ToDoListContext.Provider>
  );
};

ToDoListProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ToDoListProvider, ToDoListContext };
