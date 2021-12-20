import React, { Fragment } from "react";
import InputTodo from "./InputTodo";
import AddCourse from "./AddCourse";
import { useParams, useHistory } from 'react-router-dom'
import auth from './Auth';
import Course from './Course';

export default function Schedule() {

    const { student } = useParams();
    let history = useHistory();

    return (
        <Fragment>
            <div className = "container ">
            <h4 class="ml-4 mt-2" >STUDENT ID: {student} </h4>
            <div className="conatiner flex-parent-element mt-1 ml-2">
                <div className="flex-child-element">
                    <h3 className="dark-grey text-center mt-5">Monday</h3>
                    <InputTodo type={'mon'} studentId={student} />
                </div>
                <div className="flex-child-element">
                    <h3 className="dark-grey text-center mt-5">Tuesday</h3>
                    <InputTodo type={'tue'} studentId={student} />
                </div>
                <div className="flex-child-element">
                    <h3 className="dark-grey text-center mt-5">Wednesday</h3>
                    <InputTodo type={'wed'} studentId={student} />
                </div>
                <div className="flex-child-element">
                    <h3 className="dark-grey text-center mt-5">Thursday</h3>
                    <InputTodo type={'thu'} studentId={student} />
                </div>
                <div className="flex-child-element">
                    <h3 className="dark-grey text-center mt-5">Friday</h3>
                    <InputTodo type={'fri'} studentId={student} />
                </div>
                <div className="flex-child-element">
                    <h3 className="dark-grey text-center mt-5">Weekend</h3>
                    <InputTodo type={'wknd'} studentId={student} />
                </div>
            </div>
            <AddCourse studentId={student}/>
            <br />
            <br />
            <button className="ml-4 btn"
                onClick={() => {
                    auth.logout(() => {
                        history.push("/");
                    });
                }}>logout</button>
            <br />
            <br />
            <button className = "ml-4 btn"
            onClick ={ () => {
                window.print();
            } }
            >Export to PDF</button>
            </div>

        </Fragment>
    );
}

