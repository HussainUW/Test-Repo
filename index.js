/*
FYI: 'require()' is not part of the standard JavaScript API, intead it is a special function used by Node.js
to access modules. This is similar to how 'import' and 'include' allow us to access libraries in python and C++.
Modules in our case refer to express, pg and cors which linked to our JS / React project via Node.
*/

//requiring libraries...this allows us to use the express and cors libraries / modules
const express = require("express");
const cors = require("cors");
const pool = require("./db"); //allows us to run queries with postgres using the 'pool' required from db.js
const path = require("path");
//creating variable 'app' which will run the express library and allow us to access its functions
const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json()); //allows us to recieve data JSON from client, allows us to use the req.body object

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")));
}
//ROUTES//

//home route

/*
root route is created using a get request, first parameter is the name of the route
with the second being a function that takes a request and response parameter, arrow notation
is used to return some frontend HTML via the res.send function
*/

app.get('/', (req, res) => {
    res.send('Root');
});



//create a todo

/*
- todos route created using post request
- parameters include route name and an asynchronous function that awaits functions retrieving data from postgress
- req.body is an express object that returns request body information from server API
*/

app.post('/todos/:type/:student_id', async (req, res) => {
    try {

        const {
            type,
            student_id
        } = req.params;

        //description is assigned request body data stored in req.body
        const { description } = req.body;

        const getStudent = await pool.query("SELECT * FROM students WHERE student = $1", [student_id]);
        const student = getStudent.rows[0];

        //res.json(student);

        const newTodo = await pool.query(
            //here description refers to row within todo table in postgres db
            "INSERT INTO todo (description, type) VALUES($1, $2) RETURNING *",
            //here description refers to variable storing data from req.body
            [description, type]
        );

        const todo = newTodo.rows[0];

        const updateStudent = await pool.query("UPDATE todo SET student_id = $1 WHERE todo_id = $2",
            [student.id, todo.todo_id]);

        const getNewTodo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [todo.todo_id]);
        res.json(getNewTodo.rows[0]);

    } catch (err) {
        //catch construct for catching errors when pool returns something other than data
        console.error(err.message);
    }
});

// Create a course for a specific student
app.post('/courses/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { course } = req.body;

        const getStudent = await pool.query("SELECT * FROM students WHERE student = $1", [id]);
        const student = getStudent.rows[0];

        const newCourse = await pool.query("INSERT INTO courses (course) VALUES($1) RETURNING *", [course]);
        const courseObj = newCourse.rows[0];

        const updateCourse = await pool.query("UPDATE courses SET student_id = $1 WHERE id = $2", [student.id, courseObj.id]);

        res.json(courseObj);
    } catch (err) {
        console.error(err.message);
    }
});

// Create a task for a course
app.post('/tasks/:course', async (req, res) => {
    try {
        const { course } = req.params;
        const { task } = req.body;

        const newTask = await pool.query("INSERT INTO tasks (task) VALUES($1) RETURNING *", [task]);
        const taskObj = newTask.rows[0];

        const updateTask = await pool.query("UPDATE tasks SET course_id = $1 where id = $2", [course, taskObj.id]);

        res.json(taskObj);
    } catch (error) {
        console.error(error.message);
    }
});

//create new user

app.post('/register/', async (req, res) => {
    try {

        const { student } = req.body;
        const newUser = await pool.query(
            "INSERT INTO students (student) VALUES($1) RETURNING *",
            [student]
        );
        res.json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//fetch existing user

app.get("/login/:student", async (req, res) => {
    try {
        //storing request id in local variable...
        const { student } = req.params;
        //perform pool query asynchronously to retrieve todo object where id value matches the id value stored in req.params[id]
        const User = await pool.query("SELECT * FROM students WHERE student = $1", [student]);

        //respond with with first row from table in json format
        res.json(User.rows);
    } catch (error) {
        console.error(error.message);
    }
});

//get all todos

// app.get("/todos", async (req, res) => {
//     try{
//         const allTodos = await pool.query("SELECT * FROM todo");
//         res.json(allTodos.rows);
//     } catch (err) {
//         console.error(err.message);
//     }

// }); 

//get a todo

/* 
The ':id' clause allows the route to store an id value that comes from a particular request, for example for
todo/random, id = random. We can use the express object req.params to store this id in a local variable 'id'
*/

// Changed this to get todos based on the tag
app.get("/todos/:type/:student_id", async (req, res) => {
    try {
        //storing request id in local variable...
        const {
            type,
            student_id
        } = req.params;

        //perform pool query asynchronously to retrieve todo object where id value matches the id value stored in req.params[id]
        const getStudent = await pool.query("SELECT * FROM students WHERE student = $1", [student_id]);
        student = getStudent.rows[0];

        const todo = await pool.query("SELECT * FROM todo WHERE (type = $1 AND student_id = $2)",
            [type, student.id]);

        //respond with with first row from table in json format
        res.json(todo.rows);
    } catch (error) {
        console.error(error.message);
    }
});

//Get all courses for a student
app.get("/courses/:student_id", async (req, res) => {
    try {

        const { student_id } = req.params;

        const getStudent = await pool.query("SELECT * FROM students WHERE student = $1", [student_id]);
        const student = getStudent.rows[0];

        const courses = await pool.query("SELECT * FROM courses WHERE student_id = $1", [student.id]);

        res.json(courses.rows);
    } catch (error) {
        console.error(error.message);
    }
});
// Get all tasks for a course
app.get("/tasks/:id", async (req, res) => {

    try {

        const { id } = req.params;
        const getTask = await pool.query("SELECT * FROM tasks WHERE course_id = $1", [id]);

        res.json(getTask.rows);
    } catch (error) {
        console.error(error.message);
    }
});

//update a todo

app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        //updates todo description based on id using above local variables, then stores query in local variable 
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);

        res.json("Todo was updated!");
    } catch (error) {
        console.log(error.message);
    }
});

// update a task
app.put("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;

        const updateTask = await pool.query("UPDATE tasks SET task = $1 WHERE id = $2", [description, id]);


    } catch (error) {
        console.error(error.message);
    }
});

//delete a todo

app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("Todo was deleted!");
    } catch (error) {
        console.log(error.message);
    }
});

//delete all todos of a certain type
app.delete("/todos/type/:type/:student_id", async (req, res) => {
    try {
        const { type,
            student_id } = req.params;
        const getStudent = await pool.query("SELECT * FROM students WHERE student = $1", [student_id]);
        student = getStudent.rows[0];
        const deleteAllTodos = await pool.query("DELETE FROM todo WHERE (type = $1 AND student_id = $2)",
            [type, student.id]);
        console.log(deleteAllTodos);
        res.json("All Todos deleted!");
    } catch (error) {
        console.log(error.message);
    }
});

// Delete a course
app.delete("/courses/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTasks = await pool.query("DELETE FROM tasks where course_id = $1", [id]);
        const deleteCourse = await pool.query("DELETE FROM courses where id = $1", [id]);

    } catch (error) {
        console.error(error.message);
    }
});

// Delete a single task
app.delete("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTask = await pool.query("DELETE FROM tasks WHERE id = $1", [id]);

    } catch (error) {
        console.error(error.message);
    }
});

// Delete all tasks from a course
app.delete("/alltasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteAllTasks = await pool.query("DELETE FROM tasks WHERE course_id = $1", [id]);
    } catch (error) {
        console.error(error.message);
    }
});

// app.delete("/todos", async (req,res) => {
//     try {
//         const deleteTodos = await pool.query("DELETE FROM todo");
//         console.log(deleteTodos);
//         res.json("All Todos Deleted!")
//     } catch (erropr) {
//         console.log(error.message);
//     }
// });

//catchall

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => {
    console.log(`server has started on port ${PORT}`);
});


