import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  addItem,
  editItem,
  deleteItem,
  fetchToDoList,
} from "../Utility/methods";

const ToDoListContext = createContext();

const ToDoListProvider = ({ children }) => {
  const [toDoList, setToDoList] = useState([]);

  useEffect(() => {
    fetchToDoList().then((data) => setToDoList(data));
  }, []);

  const handleAddItem = (newItem) => {
    addItem(newItem).then((newItem) => {
      setToDoList((prevList) => [
        ...prevList,
        { ...newItem, id: `${prevList.length}` },
      ]);
    });
  };

  const handleEditItem = (id, updatedItem) => {
    editItem(id, updatedItem).then((updatedItem) => {
      setToDoList((prevList) =>
        prevList.map((item) => (item.id === id ? updatedItem : item))
      );
    });
  };

  const handleDeleteItem = (id) => {
    deleteItem(id).then(() => {
      setToDoList((prevList) => prevList.filter((item) => item.id !== id));
    });
  };

  return (
    <ToDoListContext.Provider
      value={{ toDoList, handleAddItem, handleEditItem, handleDeleteItem }}>
      {children}
    </ToDoListContext.Provider>
  );
};

ToDoListProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ToDoListProvider, ToDoListContext };
