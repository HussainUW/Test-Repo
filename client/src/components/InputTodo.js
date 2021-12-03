import React, {Fragment, useState} from "react";
import ListTodos from "./ListTodos";

//react function that returns Input Todo Header in html
const InputTodo = ({type}) => {
    const [description, setDescription] = useState("");

    //JS function that manages API for recieving a request
    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = {description};
            const response = await fetch(`http://localhost:5000/todos/${type}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            console.log(response);
            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    };

    return(
        <Fragment>
                <form className = "d-flex mt-5" onSubmit = {onSubmitForm}>
                    <input type="text" className = "form-control" value={description} 
                    onChange={e=>setDescription(e.target.value)}/>
                    <button className="btn btn-success">Add</button>
                </form>
            <ListTodos type = {type}/>
        </Fragment>
    );
};
//this function will exported for use as a module elsewhere
export default InputTodo;