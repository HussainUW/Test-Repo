import React, { Fragment, useEffect, useState } from "react";
import CreateTask from './CreateTask';
import './style.css';

const Course = ({ studentId }) => {

    const [courses, setCourses] = useState([]);

    const deleteCourse = async id => {
        try {
            window.location = `/schedule/${studentId}`;
            const response = await fetch(`http://localhost:5000/courses/${id}`, { method: "DELETE" });
            setCourses(courses.filter(course => course.id !== id));
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

    return (<Fragment>
        <div className="flex-parent-element con ml-3 even-columns">
            {
                courses.map((item) => (
                    <div className="flex-child-element col mt-2">
                        <h3>{item.course}</h3>

                        <CreateTask course={item.id} studentId={studentId} />
                        <button id="hide"
                            className="btn btn-class mb-2"
                            onClick={() => deleteCourse(item.id)}
                        >Delete Course</button>
                    </div>
                ))
            }
        </div>
    </Fragment>
    );
}

export default Course;

