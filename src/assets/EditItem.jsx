import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToDoListContext } from "./ToDoListContext";
import "./EditItem.css";

const EditItem = () => {
  const { state } = useLocation();
  const [userInput, setUserInput] = useState("");
  const [dueDate, setDueDate] = useState("");
  const { id } = state;
  const navigate = useNavigate();
  const { handleEditItem } = useContext(ToDoListContext);

  useEffect(() => {
    const task = state.toDoList.find((item) => item.id === state.id);
    setUserInput(task.task);
    setDueDate(task.dueDate);
  }, [state.toDoList, state.id]);

  const handleChange = (e) => {
    setUserInput(e.currentTarget.value);
  };

  const handleDueDateChange = (e) => {
    setDueDate(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = state.toDoList.find((item) => item.id === id);
    const updatedTask = {
      id,
      task: userInput,
      complete: task.complete,
      dueDate: dueDate,
    };
    handleEditItem(id, updatedTask);
    navigate("/", { replace: true });
  };

  const handleCancel = () => {
    navigate("/", { replace: true });
  };
  return (
    <div>
      <h1>Edit Item Info</h1>
      <form onSubmit={handleSubmit}>
        <div className='input-container'>
          <span>Activity: </span>
          <input
            className='todo-input'
            type='text'
            value={userInput}
            onChange={handleChange}
            placeholder="What's the name of the activity?"
          />
        </div>
        <div className='input-container'>
          <span>Due Date:</span>
          <input
            className='due-date-input'
            type='date'
            value={dueDate}
            onChange={handleDueDateChange}
            placeholder='Due Date: '
          />
        </div>
        <br />
        <span>
          <button className='button-cancel' onClick={handleCancel}>
            Cancel
          </button>
        </span>
        <span>
          <button className='button-submit' type='submit'>
            Save
          </button>
        </span>
      </form>
    </div>
  );
};
export default EditItem;
