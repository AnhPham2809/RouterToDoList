import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
const ToDoListContext = createContext();

const ToDoListProvider = ({ children }) => {
  const [toDoList, setToDoList] = useState(() => {
    const storedList = localStorage.getItem("toDoList");
    return storedList ? JSON.parse(storedList) : [];
  });

  useEffect(() => {
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
  }, [toDoList]);

  const addItem = (newItem) => {
    setToDoList((prevList) => [...prevList, newItem]);
  };

  const editItem = (id, updatedItem) => {
    setToDoList((prevList) =>
      prevList.map((item) => {
        if (item.id === id) {
          return updatedItem;
        }
        return item;
      })
    );
  };

  const deleteItem = (itemId) => {
    setToDoList((prevList) => {
      const newList = prevList.filter((item) => item.id !== itemId);
      return newList.map((item) =>
        item.id > itemId ? { ...item, id: item.id - 1 } : item
      );
    });
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
