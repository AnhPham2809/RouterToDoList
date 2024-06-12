import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./AddItem.css"

const AddItem = () => {
    const [userInput, setUserInput] = useState('');
    const [toDoList, setToDoList] = useState([]);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserInput(e.currentTarget.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newToDoList = [...toDoList, {id: toDoList.length +1, task: userInput, complete: false}];
        navigate('/', {state: {toDoList : newToDoList},
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