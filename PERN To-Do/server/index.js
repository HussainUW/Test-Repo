/*
FYI: 'require()' is not part of the standard JavaScript API, intead it is a special function used by Node.js
to access modules. This is similar to how 'import' and 'include' allow us to access libraries in python and C++.
Modules in our case refer to express, pg and cors which linked to our JS / React project via Node.
*/

//requiring libraries...this allows us to use the express and cors libraries / modules
const express = require("express");
const cors = require("cors");

//creating variable 'app' which will run the express library and allow us to access its functions
const app = express();

//middleware
app.use(cors());
app.use(express.json()); //allows us to recieve data JSON from client

app.listen(5000, () => {
    console.log("server has started on port 5000")
});


