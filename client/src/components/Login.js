import React, { Fragment, useState } from "react";
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

        <div className="container-fluid h-100">
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

    </Fragment>);

}

export default Login;