import React, { Fragment, useState } from "react";
import { Form, Button } from "react-bootstrap"

import { useHistory } from 'react-router-dom';
import auth from './Auth';

import './style.css';




const Login = () => {

    let history = useHistory();

    const [student, setStudent] = useState("");
    let isStudent = [];

    const onSubmitStudentId = async (e) => {
        e.preventDefault();
        try {

            const body = { student };
            console.log(body);
            const response = await fetch(`http://localhost:5000/login/${student}`);
            const jsonData = await response.json();

            isStudent = jsonData;
            console.log(jsonData);
            
            if (isStudent.length === 0) {
                console.log("if statement activated!");
                const response = await fetch("http://localhost:5000/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }
                );
            }

            auth.login(() => {
                history.push(`/schedule/${student}`);
            });

        } catch (error) {
            console.error(error.message);
        }
    }

    return (<Fragment>
        <h1 class="display-1">Weekly Course Logger</h1>
        <div className='color-overlay d-flex justify-content-center align-items-center'>
        
            <Form className='rounded p-4 p-sm-3'>
            <Form.Group className='mb-3'
                controlId = "formBasicEmail">
                    <Form.Label>Student ID</Form.Label>
                    <input _ngcontent-c0="" className="form-control form-control-lg" placeholder="Enter Student ID"
                                value={student}
                                onChange={e => setStudent(e.target.value)} />
                    <Form.Text className="text-muted">
                    New and Returning Users please enter Student ID.                                                                 
                    </Form.Text>
                    <Form.Text className="invisible">
                                                                         
                    </Form.Text>
                </Form.Group>
                
                <button class="btn btn-class" onClick={onSubmitStudentId}>Login/Register</button>
                    &nbsp;
                    <button class="btn btn-class" onClick={() =>{history.push("schedule/12345678");}}>Demo</button>
                    
                    <button type = "button" class="btn btn-class float-right" data-toggle="modal" data-target="#mymodal">About</button>
            </Form>
        </div>
        

        {/* MODAL ABOUT SECTION POPUP  */}
        <div class="modal" id="mymodal">
            <div class="modal-dialog" >
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 class="modal-title"> Weekly Course Logger</h2>
                    </div>
                    <div class="modal-body">
                        <p> some text here </p>
                    </div>    
                </div>
            </div>
         </div> 
        {/* MODAL ABOUT SECTION POPUP END */}
        



    </Fragment>);

}

export default Login;

{/* <div className="container-fluid h-100">
<div className="row justify-content-center align-items-center h-100">
    <div className="col col-sm-6 col-md-6 col-lg-4 col-xl-3">
        <p>
            If your an existing user enter your student id to access
            your weekly shedule. If not, enter your student ID to
            create a new schedule associated with your ID. To demo
            this application, enter '12345678'.
        </p>
        <form action="" onSubmit={onSubmitStudentId}>
            <div className="form-group">
                <input _ngcontent-c0="" className="form-control form-control-lg"
                    value={student}
                    onChange={e => setStudent(e.target.value)} />
            </div>

            <div className="form-group">
                <button className="btn btn-info btn-lg btn-block"
                    onClick={onSubmitStudentId}>login</button>
            </div>
        </form>
    </div>
</div>
</div>

</Form.Group>
                
                <button class="btn btn-class">Login</button>
                <button class="btn btn-class">Register</button>
                <button class="btn btn-class">Demo</button>
            </Form>*/}