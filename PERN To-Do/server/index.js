/*
FYI: 'require()' is not part of the standard JavaScript API, intead it is a special function used by Node.js
to access modules. This is similar to how 'import' and 'include' allow us to access libraries in python and C++.
Modules in our case refer to express, pg and cors which linked to our JS / React project via Node.
*/

//requiring libraries...this allows us to use the express and cors libraries / modules
const express = require("express");
const cors = require("cors");
const pool = require("./db"); //allows us to run queries with postgres using the 'pool' required from db.js

//creating variable 'app' which will run the express library and allow us to access its functions
const app = express();

//middleware
app.use(cors());
app.use(express.json()); //allows us to recieve data JSON from client, allows us to use the req.body object

//ROUTES//

//create a todo

app.post('/todos', async(req, res) =>{
    try {
        const {description} = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//get all todos
app.get("/todos", async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows); 
    } catch (err) {
        console.error(err.message);
    }
});

//get a todo
app.get("/todos/:id", async(req,res) =>{
    try {
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//update a todo
app.put("/todos/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
        res.json("Todo was updated.")
    } catch (err) {
        console.error(err.message);
    }
});

//delete a todo
app.delete("/todos/:id", async(req,res) =>{
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1",[id]);
        res.json("Todo was deleted");
    } catch (err) {
        console.error(err.message);
    }
});

//delete all todos
app.delete("/todos", async(req,res) =>{
    try {
        const deleteTodos = await pool.query("DELETE FROM todo");
        res.json("All todos were deleted");
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(5000, () => {
    console.log("server has started on port 5000")
});
