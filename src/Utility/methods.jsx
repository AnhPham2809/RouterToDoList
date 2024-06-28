export const addItem = (BASE_URL, toDoList, setToDoList) => (newItem) => {
  fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newItem),
  })
    .then((response) => response.json())
    .then((newItem) => {
      const maxId = toDoList.reduce((max, item) => Math.max(max, item.id), 0);
      setToDoList((prevList) => [...prevList, { ...newItem, id: maxId + 1 }]);
    });
};

export const editItem =
  (BASE_URL, toDoList, setToDoList) => (id, updatedItem) => {
    fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedItem),
    })
      .then((response) => response.json())
      .then((updatedItem) =>
        setToDoList((prevList) =>
          prevList.map((item) => (item.id === id ? updatedItem : item))
        )
      );
  };

export const deleteItem = (BASE_URL, toDoList, setToDoList) => (id) => {
  fetch(`${BASE_URL}/${id}`, { method: "DELETE" })
    .then((response) => response.json())
    .then(() => {
      setToDoList((prevList) => {
        const newList = prevList.filter((item) => item.id !== id);
        return newList.map((item) =>
          item.id > id ? { ...item, id: item.id - 1 } : item
        );
      });
    });
};
