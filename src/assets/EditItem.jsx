import {useState, useEffect} from "react";
import { useNavigate, useLocation} from "react-router-dom";
import "./EditItem.css"


//Notes for Zee reading, the edit button main function (to edit) works. But something is very wrong with the completed status.
// Pressing Cancel will flips the current complete status. Pressing Save will always set it to not complete for some reason. 
const EditItem = () => {
    const {state} = useLocation();
    const [userInput, setUserInput] = useState("");
    const [dueDate, setDueDate] = useState("");
    const { id } = state;
    const navigate = useNavigate();


    useEffect(() => {
        const task = state.toDoList.find((item) => item.id === state.id);
        setUserInput(task.task);
        setDueDate(task.dueDate);
      }, [state]);

    const handleChange = (e) => {
        setUserInput(e.currentTarget.value);
    }

    const handleDueDateChange = (e) => {
        setDueDate(e.currentTarget.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedTask = {
          id,
          task: userInput,
          complete: state.complete,
          dueDate: dueDate
        };
        const updatedToDoList = state.toDoList.map((item) => {
          if (item.id === id) {
            return updatedTask;
          }
          return item;
        });
        navigate('/', { state: { toDoList: updatedToDoList } });
      };

    const handleCancel = () => {
        navigate('/', {state: {toDoList: state.toDoList}});
    }
    return (
        <div>
          <h1>Edit Item Info</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <span>Activity: </span>
              <input
                className="todo-input"
                type="text"
                value={userInput}
                onChange={handleChange}
                placeholder="What's the name of the activity?"
              />
            </div>
            <div className="input-container">
              <span>Due Date:</span>
              <input
                className="due-date-input"
                type="date"
                value={dueDate}
                onChange={handleDueDateChange}
                placeholder="Due Date: "
              />
            </div>
            <br />
            <span>
              <button className="button-cancel" onClick={handleCancel}>Cancel</button>
            </span>
            <span>
              <button className="button-submit" type="submit">Save</button>
            </span>
          </form>
        </div>
      );
}
export default EditItem;