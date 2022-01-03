import React, {Fragment, useEffect, useState} from "react";
import EditTask from './EditTask';
import './style.css';

const ListTasks = ({course, studentId}) => {

    const [tasks, setTasks] = useState([]);

    //delete todo function
    const deleteTasks = async id =>{
        try {
            setTasks(tasks.filter(tasks => tasks.id !== id));
            const deleteTask = await fetch(`http://localhost:5000/tasks/${id}`, {method: "DELETE"});
            console.log(deleteTask);
        } catch (err) {
            console.error(err.message);
        }
    };

    //delete all todos
    const deleteAllTasks = async() => {
        try {
            setTasks([]);
            const deleteAllTasks = await fetch(`http://localhost:5000/alltasks/${course}`, {method:"DELETE"});
            console.log(deleteAllTasks);
        } catch (error) {
            console.error(error.message);
        }
    }

    const getTasks = async() => {
        try {
            const response = await fetch(`http://localhost:5000/tasks/${course}`);
            const jsonData = await response.json();

            setTasks(jsonData);
            
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getTasks();
    }, []);

    return <Fragment>
            <table cellPadding="4" cellSpacing="4" border="0">
                <thead>
                <button id="hide"
                        className = "btn btn-class"
                            onClick = {() => deleteAllTasks(tasks)}
                        ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder-x" viewBox="0 0 16 16">
                        <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181L15.546 8H14.54l.265-2.91A1 1 0 0 0 13.81 4H2.19a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91H9v1H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zm6.339-1.577A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z"/>
                        <path d="M11.854 10.146a.5.5 0 0 0-.707.708L12.293 12l-1.146 1.146a.5.5 0 0 0 .707.708L13 12.707l1.146 1.147a.5.5 0 0 0 .708-.708L13.707 12l1.147-1.146a.5.5 0 0 0-.707-.708L13 11.293l-1.146-1.147z"/>
                      </svg>
                      </button> 
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task.course_id}>
                            <td className = "dark-grey">{task.task}</td>
                            <td>
                                <EditTask task = {task} studentId ={studentId}/>
                            </td>
                            <td>
                                <button id="hide" 
                                className = "btn btn-class"
                                onClick={() => deleteTasks(task.id)}
                                ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                              </svg></button>
                            </td>
                        </tr>                   
                    ))}
                </tbody>
                <tfoot>
                <tr>
                    <td>

                    </td>
                    <td>
                        
                    </td>
                    <td>
                        
                    </td>
                </tr>
                </tfoot>
            </table>
    </Fragment>
};

export default ListTasks;