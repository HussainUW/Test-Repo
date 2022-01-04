import React, { Fragment } from "react";
import InputTodo from "./InputTodo";
import AddCourse from "./AddCourse";
import { Form, Button } from "react-bootstrap"

import { useParams, useHistory } from 'react-router-dom'
import auth from './Auth';
import Course from './Course';

export default function Schedule() {

    const { student } = useParams();
    let history = useHistory();
    return (
        <Fragment>
            <title>test</title>
            <body>

                <h1 class="display-1"> Weekly Course Logger
                    <div class="right">
                        <button id="hide" className="btn btn-class"
                            onClick={() => {
                                auth.logout(() => {
                                    history.push("/");
                                });
                            }}>logout</button>
                    </div>
                    <h4 class="display-2" > STUDENT ID: {student}</h4>
                </h1>



            




                    <div class = "con ml-3">
                        <div class="even-columns">
                            <div class="col">

                                <h3 className="dark-grey text-center mt-5">Monday</h3>
                                <InputTodo type={'mon'} studentId={student} />
                            </div>

                            <div class="col">

                                <h3 className="dark-grey text-center mt-5">Tuesday</h3>
                                <InputTodo type={'tue'} studentId={student} />
                            </div>

                            <div class="col">
                                <h3 className="dark-grey text-center mt-5">Wednesday</h3>
                                <InputTodo type={'wed'} studentId={student} />
                            </div>

                            <div class="col">

                                <h3 className="dark-grey text-center mt-5">Thursday</h3>
                                <InputTodo type={'thu'} studentId={student} />
                            </div>

                            <div class="col">

                                <h3 className="dark-grey text-center mt-5">Friday</h3>
                                <InputTodo type={'fri'} studentId={student} />
                            </div>

                            <div class="col">
                                <h3 className="dark-grey text-center mt-5">Weekend</h3>
                                <InputTodo type={'wknd'} studentId={student} />
                            </div>
                        </div>

                    </div>








                    <br />
                    <br />
                    <AddCourse studentId={student} />
                    <br />
                    <br />
                    <button id= "hide" className="ml-4 btn"
                        onClick={() => {
                            window.print();
                        }}
                    >Export to PDF</button>


            </body>
        </Fragment>
    );
}


