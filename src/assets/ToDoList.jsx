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

const handleComplete = (id) => {
    const updatedList = toDoList.map((item) => {
        if (item.id === id){
            item.complete = !item.complete;
        }
        return item;
    });
    setToDoList(updatedList);
}

return (
<div>
<h1> The To Do List! Router version!</h1>
<Link className="todo-button" to="add-item" state={{ toDoList: toDoList }}>Add Item</Link>


<ul>
        {toDoList.map((item) => (
          <p key={item.id}>

<div
        className="ToDoList"
        onClick={() => handleComplete(item.id)}
        style={{
          background: item.complete ? 'green' : 'black',
          cursor: 'pointer' // add a pointer cursor to indicate it's clickable
        }}
      >
             <span>
              {item.task}
            </span>
            <button className="todo-button-remove" 
            onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleDeleteTask(item.id)}}>Delete</button>
            </div>
          </p>
        ))}
      </ul>
        {showConfirm && (
          <div className="big-layer-to-prevent-user-to-click" onClick={(e) => e.stopPropagation()} />
        )}
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