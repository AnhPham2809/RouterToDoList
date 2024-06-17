import {useState, useEffect} from "react";
import {  useLocation, Link, useNavigate  } from "react-router-dom";
import "./ToDoList.css"

const ToDoList = () => {
const [toDoList, setToDoList] = useState([]);

const [showConfirm, setShowConfirm] = useState(false);
const [taskToRemove, setTaskToRemove] = useState(null);

const {state}= useLocation();
const navigate = useNavigate();

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

const handleComplete = (id) => {
    const updatedList = toDoList.map((item) => {
        if (item.id === id){
            item.complete = !item.complete;
        }
        return item;
    });
    setToDoList(updatedList);
}

const handleEditTask = (id) => {
  navigate(`/edit-item/${id}`, { state: { toDoList, id } });
};

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
            <span>
                Due: {item.dueDate}
            </span>
            <div className="button-holder">
            <button className="todo-button-remove" 
            onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleDeleteTask(item.id)}}>Delete</button>

<button
                className="todo-button-edit"
                onClick={() => handleEditTask(item.id)}
>
                Edit
              </button>
              </div>
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