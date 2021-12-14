import React, { Fragment, useState } from "react";
import EditTodo from "./EditTodo";
import ListTodos from "./ListTodos";
import './style.css';

const AddCourse = () => {

    const [course, setCourse] = useState("");

    const onSubmitCourse = (e) => {
        e.preventDefault();
        try {
            const courseType = new Object({ course });
            
            <Fragment>
                <div>
                    <inputTodo type={courseType} />
                </div>
            </Fragment>
            console.log(courseType);
        } catch (error) {
            console.error(error.message);
        }
    }

    return <Fragment>
        <div className="mt-2 ml-4">
            <button className="btn" data-toggle="modal" data-target="#myModal"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-file-earmark-plus" viewBox="0 0 16 16">
                <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z" />
                <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
            </svg><div>Add New Course</div></button>
        </div>

        <div class="modal" id="myModal">
            <div class="modal-dialog">
                <div class="modal-content">


                    <div class="modal-header">
                        <h4 class="modal-title">Enter Course Name</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>


                    <div class="modal-body">
                        <form className="d-flex" onSubmit={onSubmitCourse}>
                            <div>
                                <input type="text" className="form-control" value={course}
                                    onChange={e => setCourse(e.target.value)} />
                            </div>
                        </form>
                    </div>


                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-success" data-dismiss="modal"
                            onClick={onSubmitCourse}
                        >Submit</button>
                    </div>

                </div>
            </div>
        </div>

    </Fragment>

}

export default AddCourse;