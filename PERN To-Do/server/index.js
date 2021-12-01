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

//home route

/*
root route is created using a get request, first parameter is the name of the route
with the second being a function that takes a request and response parameter, arrow notation
is used to return some frontend HTML via the res.send function
*/

app.get('/', (req,res)=>{
    res.send('Home Page');
});

//create a todo

/*
- todos route created using post request
- parameters include route name and an asynchronous function that awaits functions retrieving data from postgress
- req.body is an express object that returns request body information from server API
*/

app.post('/todos', async(req,res) => {
    try {
        //description is assigned request body data stored in req.body
        const {description} = req.body;
        //route awaits data from database query function pool
        const newTodo = await pool.query(
            //here description refers to row within todo table in postgres db
            "INSERT INTO todo (description) VALUES($1) RETURNING *",
            //here description refers to variable storing data from req.body
            [description]
        );
        //response variable returns data retrieved from query pool as json data
        res.json(newTodo.rows[0]);
    } catch (err) {
        //catch construct for catching errors when pool returns something other than data
        console.error(err.message);
    }
});

//get all todos

app.get("/todos", async (req, res) => {
    try{
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }

}); 

//get a todo

/* 
The ':id' clause allows the route to store an id value that comes from a particular request, for example for
todo/random, id = random. We can use the express object req.params to store this id in a local variable 'id'
*/

app.get("/todos/:id", async (req, res) => {
    try {
        //storing request id in local variable...
        const {id} = req.params;
        //perform pool query asynchronously to retrieve todo object where id value matches the id value stored in req.params[id]
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);

        //respond with with first row from table in json format
        res.json(todo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});

//update a todo

app.put("/todos/:id", async (req,res) => {
    try {
        const {id} = req.params;
        const {description} = req.body;
        //updates todo description based on id using above local variables, then stores query in local variable 
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);

        res.json("Todo was updated!");
    } catch (error) {
        console.log(error.message);
    }
});

//delete a todo

app.delete("/todos/:id", async (req,res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("Todo was deleted!");
    } catch (error) {
        console.log(error.message);
    }
});

app.listen(5000, () => {
    console.log("server has started on port 5000")
});


