const BASE_URL = "http://localhost:3000/toDoList";

const fetchToDoList = () => {
  return fetch(BASE_URL)
    .then((response) => response.json())
    .then((data) => data);
};

const addItem = (newItem) => {
  return fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newItem),
  })
    .then((response) => response.json())
    .then((newItem) => newItem);
};

const editItem = (id, updatedItem) => {
  return fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedItem),
  })
    .then((response) => response.json())
    .then((updatedItem) => updatedItem);
};

const deleteItem = (id) => {
  return fetch(`${BASE_URL}/${id}`, { method: "DELETE" })
    .then((response) => response.json())
    .then(() => {});
};

export { addItem, editItem, deleteItem, fetchToDoList };
