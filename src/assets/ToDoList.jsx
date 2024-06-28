import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ToDoList.css";
import { ToDoListContext } from "./ToDoListContext";

const ToDoList = () => {
  const { toDoList, editItem, deleteItem } = useContext(ToDoListContext);

  const [showConfirm, setShowConfirm] = useState(false);
  const [taskToRemove, setTaskToRemove] = useState(null);

  const navigate = useNavigate();

  const handleDeleteTask = (e, taskId) => {
    e.stopPropagation();
    e.preventDefault();
    setTaskToRemove(taskId);
    setShowConfirm(true);
  };

  const handleConfirmRemove = () => {
    deleteItem(taskToRemove);
    setShowConfirm(false);
  };

  const handleCancelRemove = () => {
    setShowConfirm(false);
  };

  const handleComplete = (id) => {
    const itemToUpdate = toDoList.find((item) => item.id === id);
    if (itemToUpdate) {
      editItem(id, { ...itemToUpdate, complete: !itemToUpdate.complete });
    }
  };

  const handleEditTask = (id) => {
    navigate(`/edit-item/${id}`, { state: { toDoList, id } });
  };

  return (
    <div>
      <h1> The To Do List! Router version!</h1>
      <Link
        className='todo-button'
        to='add-item'
        state={{ toDoList: toDoList }}>
        Add Item
      </Link>

      <ul>
        {toDoList.map((item) => (
          <p key={item.id}>
            <div
              className='ToDoList'
              onClick={() => handleComplete(item.id)}
              style={{
                background: item.complete ? "green" : "black",
                cursor: "pointer", // add a pointer cursor to indicate it's clickable
              }}>
              <span>{item.task}</span>
              <span>Due: {item.dueDate}</span>
              <span>{item.complete ? "Complete" : "Not Complete"}</span>
              <div className='button-holder'>
                <button
                  className='todo-button-remove'
                  onClick={(e) => {
                    handleDeleteTask(e, item.id);
                  }}>
                  Delete
                </button>

                <button
                  className='todo-button-edit'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditTask(item.id);
                  }}>
                  Edit
                </button>
              </div>
            </div>
          </p>
        ))}
      </ul>
      {showConfirm && (
        <div
          className='big-layer-to-prevent-user-to-click'
          onClick={(e) => e.stopPropagation()}
        />
      )}
      {showConfirm && (
        <div className='confirm-popup'>
          <p>Do you really want to remove this task?</p>
          <button className='confirm-yes' onClick={handleConfirmRemove}>
            Yes!
          </button>
          <button className='confirm-no' onClick={handleCancelRemove}>
            No...
          </button>
        </div>
      )}
    </div>
  );
};

export default ToDoList;
