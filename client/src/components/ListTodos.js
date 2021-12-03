import React, {Fragment, useEffect, useState} from "react";
import EditTodo from "./EditTodo";

const ListTodos = ({type}) => {

    const [todos, setTodos] = useState([]);

    //delete todo function
    const deleteTodo = async id =>{
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {method: "DELETE"});
            setTodos(todos.filter(todo => todo.todo_id !== id));
            console.log(deleteTodo);
        } catch (err) {
            console.error(err.message);
        }
    };

    //delete all todos
    const deleteAllTodos = async() => {
        try {
            const deleteAllTodos = await fetch(`http://localhost:5000/todos/type/${type}`, {method:"DELETE"});
            console.log(deleteAllTodos);
            window.location = "/";
        } catch (error) {
            console.error(error.message);
        }
    }

    const getTodos = async() => {
        try {
            const response = await fetch(`http://localhost:5000/todos/${type}`);
            const jsonData = await response.json();

            setTodos(jsonData);
            
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getTodos();
    }, []);

    return <Fragment>
        <div>
            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.type}>
                            <td>{todo.description}</td>
                            <td>
                                <EditTodo todo = {todo}/>
                            </td>
                            <td>
                                <button 
                                className="btn btn-danger" 
                                onClick={() => deleteTodo(todo.todo_id)}
                                >Delete</button>
                            </td>
                        </tr>                   
                    ))}
                </tbody>
                <tfoot>
                <tr>
                    <td></td>
                    <td></td>
                    <td>
                        <button
                                className="btn btn-danger"
                                onClick = {() => deleteAllTodos(todos)}
                        >Delete All</button>
                    </td>
                </tr>
                </tfoot>
            </table>
        </div>
    </Fragment>
};

export default ListTodos;