import React, { useState, useEffect } from "react";
import "./App.css";



function App() {
  //const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [currentEdit, setcurrentEdit] = useState("");
  const [currentEditedItem, setcurrentEditedItem] = useState("");
  const [value, setValue] = useState("");
  
   
  const options = [
    { label: "Not Completed", value: "Not Completed" },
    { label: "Completed", value: "Completed" },
  ];
  
  
  const handleAddtodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
  };
  const handleDeleteTodo = (index) => {
    let reduceTodo = [...allTodos];
    reduceTodo.splice(index);

    localStorage.setItem("todolist", JSON.stringify(reduceTodo));
    setTodos(reduceTodo);
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolist"));
    if (savedTodo) {
      setTodos(savedTodo);
    }
  }, []);
  const handleEdit = (ind, item) => {
    console.log(ind);
    setcurrentEdit(ind);
    setcurrentEditedItem(item);
  };

  const handleUpdateTitle = (value) => {
    setcurrentEditedItem((prev) => {
      return { ...prev, title: value };
    });
  };

  const handleUpdateDescription = (value) => {
    setcurrentEditedItem((prev) => {
      return { ...prev, description: value };
    });
  };

  const handleUpdatetodo = () => {
    let newTodo = [...allTodos];
    newTodo[currentEdit] = currentEditedItem;
    setTodos(newTodo);
    setcurrentEdit("");
  };
  function handlestatus(event) {
    setValue(event.target.value);
  }

  return (
    <div className="App">
      <h1>My Todos</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Todo Name"
            />
          </div>
          <div className="todo-input-item">
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Todo Description"
            />
          </div>

          <div className="todo-input-item">
            <button
              type="button"
              onClick={handleAddtodo}
              className="primaryBtn"
            >
              Add
            </button>
          </div>
        </div>
      </div>
      {/* <div className="btn-area">
        <button
          className={`secondaryBtn ${isCompleteScreen === false && "active"}`}
          onClick={() => setIsCompleteScreen(false)}
        >
          Todo
        </button>
          </div>  */}
    
      
    
        <div className="filter-area">
            <select name="Not completed">
                <option value="all">All</option>
                <option value="Completed">Completed</option>
                <option value="Not Completed">Not Completed</option>
            </select>
        </div>
    


      <div className="todo-list">
        <h3>My Todos</h3>
        {allTodos.map((item, index) => {
          if (currentEdit === index) {
            return (
              <div className="edit_wrapper">
                <input
                  placeholder="Updated Title"
                  onChange={(e) => handleUpdateTitle(e.target.value)}
                  value={currentEditedItem.title}
                />

                <textarea
                  placeholder="Updated Description"
                  onChange={(e) => handleUpdateDescription(e.target.value)}
                  value={currentEditedItem.description}
                />

                <button
                  type="button"
                  onClick={handleUpdatetodo}
                  className="primaryBtn"
                >
                  Update
                </button>
              </div>
            );
          } else {
            return (
              <div className="todo-list-item" key={index}>
                <div>
                  <p>Name:{item.title}</p>
                  <p>Description:{item.description}</p>
                  
                    status:
                    <div>
                      <select className="dropdown-menu" onChange={handlestatus}>
                        {options.map((option => (
                          <option value={option.value}>{option.label}</option>
                        )))}
                        </select>
                      </div>
                                  </div>
                  
                  
                

                <div>
                  <button
                    className="Edit"
                    onClick={() => handleEdit(index, item)}
                  >
                    Edit
                  </button>
                </div>
                <div>
                  <button
                    className="Delete"
                    onClick={() => handleDeleteTodo(index)}
                  >
                    delete
                  </button>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
 
}
export default App;
