import React, {Fragment, useState} from "react";

//react function that returns Input Todo Header in html
const InputMondayTodo = () => {
    const [description, setDescription] = useState("");

    //JS function that manages API for recieving a request
    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = {description};
            const response = await fetch("http://localhost:5000/todos/mon", {
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
            <h3 className="text-center mt-5">Monday Todo List</h3>
                <form className = "d-flex mt-5" onSubmit = {onSubmitForm}>
                    <input type="text" className = "form-control" value={description} 
                    onChange={e=>setDescription(e.target.value)}/>
                    <button className="btn btn-success">Add</button>
                </form>
        </Fragment>
    );
};
//this function will exported for use as a module elsewhere
export default InputMondayTodo;