import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "./AddItem.css"

const AddItem = () => {
    const [userInput, setUserInput] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [inputFocus, setInputFocus] = useState('');

    const { state } = useLocation();
const { toDoList } = state || {};

    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserInput(e.currentTarget.value);
    };

    const handleDueDateChange = (e) => {
      setDueDate(e.currentTarget.value);
    }

    const handleSubmit = (e) => {
      console.log('handleSubmit called');
        e.preventDefault();
        const newTask = {
          id: toDoList.length +1,
           task: userInput,
            complete: false,
          dueDate: dueDate
        };
        const newToDoList = [...toDoList, newTask ];
        navigate('/', {state: {toDoList : newToDoList}
        });
    };

    const handleCancel = () => {
      navigate('/', {replace: true});
    }

    return (
        <div>
          <h1>Enter Item Info</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
            <span>Activity: </span>
<input
            className="todo-input"
              type="text"
              value={userInput}
              onChange={handleChange}
              placeholder=
            { inputFocus ? "" : 
              "What's the name of the activity?"
            }
            onFocus = {() => setInputFocus(true)}
            onBlur = {() => setInputFocus(false)}
            />
            </div>
            <div className="input-container">
            <span>Due Date:</span>
            <input 
             className = "due-date-input"
            type = "date"
            value = {dueDate}
            onChange={handleDueDateChange}
            placeholder="Due Date: "
            onFocus="this.showPicker()"
            />
  </div>
            <br></br>
            <span>
            <button className="button-cancel" onClick={handleCancel}>Cancel</button>
             </span>
            <span>
            <button className="button-submit" type="submit">Add</button>
            </span>
          </form>
        </div>
      );
}
export default AddItem;