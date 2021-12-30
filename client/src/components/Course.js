import { Fragment } from "react";
import './style.css';

function Course ({courseName}){
    return <Fragment>
        <div className="flex-child-element">
            <h1>Course:</h1>
            <h3>{courseName}</h3>
        </div>
    </Fragment>
}

export default Course;

