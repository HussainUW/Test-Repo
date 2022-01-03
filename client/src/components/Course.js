import React, {Fragment, useEffect, useState} from "react";
import CreateTask from './CreateTask';
import './style.css';

const Course = ({studentId}) => {

    const [courses, setCourses] = useState([]);

    const deleteCourse = async id => {
        try {
            const response = await fetch(`http://localhost:5000/courses/${id}`,{method: "DELETE"});
            setCourses(courses.filter(course => course.id !== id));
            window.location = `/schedule/${studentId}`;
        } catch (error) {
            console.error(error.message);
        }

    };

    const getCourses = async () => {
        try {
            const response = await fetch(`http://localhost:5000/courses/${studentId}`);
            const jsonData = await response.json();

            setCourses(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getCourses();
    }, []);

    return ( <Fragment>
        <div className = "flex-parent-element">
            {
                courses.map((item) => (
                    <div className="flex-child-element">
                        <h1>{item.course}</h1>
                        <button id="hide" 
                                className = "btn btn-class"
                                onClick={() => deleteCourse(item.id)}
                                ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                              </svg></button>
                        <CreateTask course = {item.id} studentId = {studentId}/>
                    </div>
                ))        
            }
        </div>
    </Fragment>
    );
}

export default Course;

