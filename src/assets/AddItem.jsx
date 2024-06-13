import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "./AddItem.css"

const AddItem = () => {
    const [userInput, setUserInput] = useState('');

    const { state } = useLocation();
const { toDoList } = state || {};

    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserInput(e.currentTarget.value);
    };

    const handleSubmit = (e) => {
      console.log('handleSubmit called');
        e.preventDefault();
        const newTask = {id: toDoList.length +1, task: userInput, complete: false};
        const newToDoList = [...toDoList, newTask ];
        navigate('/', {state: {toDoList : newToDoList}
        });
    };

    return (
        <div>
          <h1>You are adding a new item</h1>
          <form onSubmit={handleSubmit}>
            <input
            className="todo-input"
              type="text"
              value={userInput}
              onChange={handleChange}
              placeholder="What's the name of the activity?"
            />
            <button type="submit">Add</button>
          </form>
        </div>
      );
}
export default AddItem;