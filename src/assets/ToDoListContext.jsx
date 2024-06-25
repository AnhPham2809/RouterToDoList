import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
const ToDoListContext = createContext();

const ToDoListProvider = ({ children }) => {
  const [toDoList, setToDoList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/toDoList")
      .then((response) => response.json())
      .then((data) => setToDoList(data));
  }, []);

  const addItem = (newItem) => {
    fetch("http://localhost:3000/toDoList", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    })
      .then((response) => response.json())
      .then((newItem) => {
        const maxId = toDoList.reduce((max, item) => Math.max(max, item.id), 0);
        setToDoList((prevList) => [...prevList, { ...newItem, id: maxId + 1 }]);
      });
  };

  const editItem = (id, updatedItem) => {
    fetch(`http://localhost:3000/toDoList/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedItem),
    })
      .then((response) => response.json())
      .then((updatedItem) =>
        setToDoList((prevList) =>
          prevList.map((item) => (item.id === id ? updatedItem : item))
        )
      );
  };

  const deleteItem = (id) => {
    fetch(`http://localhost:3000/toDoList/${id}`, { method: "DELETE" })
      .then((response) => response.json())
      .then(() => {
        setToDoList((prevList) => {
          const newList = prevList.filter((item) => item.id !== id);
          return newList.map((item) =>
            item.id > id ? { ...item, id: item.id - 1 } : item
          );
        });
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
