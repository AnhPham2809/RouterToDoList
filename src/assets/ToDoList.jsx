import {useState, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ToDoList.css"

const ToDoList = () => {
const [toDoList, setToDoList] = useState([]);

const [showConfirm, setShowConfirm] = useState(false);
const [taskToRemove, setTaskToRemove] = useState(null);

const navigate = useNavigate();
const location = useLocation();

useEffect(() => {
if (location.state && location.state.toDoList) {
    setToDoList(location.state.toDoList);
}
else {
    setToDoList([]);
}
}, [location]);

const handleAddItem = () => {
    navigate('/add-item');
}



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
<button className="todo-button" onClick={handleAddItem}> Add New Item </button>
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