import {useState, useEffect} from "react";
import {  useLocation, Link } from "react-router-dom";
import "./ToDoList.css"

const ToDoList = () => {
const [toDoList, setToDoList] = useState([]);

const [showConfirm, setShowConfirm] = useState(false);
const [taskToRemove, setTaskToRemove] = useState(null);

const {state}= useLocation();

useEffect(() => {
if (state && state.toDoList) {
    setToDoList(state.toDoList);
}
else {
    setToDoList([]);
}
}, [state]);


const handleDeleteTask = (taskId) => {
    setTaskToRemove(taskId);
    setShowConfirm(true);
}

const handleConfirmRemove = () => {
    setToDoList(toDoList.filter((task) => task.id !== taskToRemove))
    setShowConfirm(false);
}

const handleCancelRemove = () => {
    setShowConfirm(false);
}

return (
<div>
<h1> The To Do List! Router version!</h1>
<Link className="todo-button" to="add-item" state={{ toDoList: toDoList }}>Add Item</Link>
<ul>
    {toDoList.map((task) => (
        <p className ="ToDoList" key={task.id}>
            {task.task}
            <button className="todo-button-remove" 
            onClick={() => handleDeleteTask(task.id)}>
                Remove
                </button>
        </p>
    ))}
</ul>

{showConfirm && (
     <div className="confirm-popup">
<p>Do you really want to remove this task?</p>
<button className="confirm-yes" onClick={handleConfirmRemove}>Yes!</button>
<button className ="confirm-no" onClick={handleCancelRemove}>No...</button>
        </div>
)}
</div>
);
};

export default ToDoList;