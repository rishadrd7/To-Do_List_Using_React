import React, { useState } from "react"


function ToDoList() {

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [editIndex, setEditIndex] = useState(null);  
    const [editText, setEditText] = useState("");  


    
    

    function handleInputchange(event) {

        setNewTask(event.target.value);
        console.log(newTask, 'new task')
    }


    //Add tasks
    function addTask() {
       if(newTask.trim() !== ""){
        setTasks(t => [...t, newTask]);
        setNewTask("");
       }

    }


    //Delete tasks
    function deleteTask(index) {
        const updateTasks = tasks.filter((a,i) => i!== index );
        setTasks(updateTasks);

    }


    //Move to Up 
    function moveTaskUp(index) {
        if(index > 0){
            const updateTasks = [...tasks];
            [updateTasks[index], updateTasks[index - 1]] =
            [updateTasks[index-1], updateTasks[index]];
            setTasks(updateTasks)
        }
    }

    //Move to Down
    function moveTaskDown(index) {
        if(index < tasks.length -1){
            const updateTasks = [...tasks];
            [updateTasks[index], updateTasks[index + 1]] =
            [updateTasks[index+1], updateTasks[index]];
            setTasks(updateTasks)
        }

    }

      // Enable edit mode
      function enableEditMode(index) {
        setEditIndex(index);
        setEditText(tasks[index]);
    }

    // edit task 
    function handleEditChange(event) {
        setEditText(event.target.value);
    }

    // Save the task
    function saveEditTask() {
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = editText;
        setTasks(updatedTasks);
        setEditIndex(null);
        setEditText("");
    }


    return (
        <div className="to-do-List">
            <h1>To-Do List</h1>

            <div>
                <input
                    type="text"
                    placeholder="Enter a task..."
                    value={newTask}
                    onChange={handleInputchange}
                />
                <button className="add-button"
                    onClick={addTask}
                >Add
                </button>

                <ul>
                    {tasks.map((task, index) =>  
                        <li key={index}>
                                {editIndex === index ? (
                                <input
                                    type="text"
                                    value={editText}
                                    onChange={handleEditChange}
                                />
                            ) : (
                                <span className="text">{task}</span>
                            )}


                        <button
                            className="delete-button"
                            onClick={() => deleteTask(index)}>
                            Delete
                        </button>

                        <button
                            className="move-button"
                            onClick={() => moveTaskUp(index)}>
                            👆
                        </button>
                        <button
                            className="move-button"
                            onClick={() => moveTaskDown(index)}>
                            👇
                        </button>


                        {editIndex === index ? (
                                <button className="save-button" onClick={saveEditTask}>
                                    Save
                                </button>
                            ) : (
                                <button className="edit-button" onClick={() => enableEditMode(index)}>
                                    Edit
                                </button>
                            )}
                    </li>
                    )}
                </ul>

            </div>

        </div>)
}



export default ToDoList