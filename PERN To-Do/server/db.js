/*requiring module pg and storing it as variable 'Pool', this allows us to access the functionality of module pg
via the Pool variable. In our case the pg functionality we want to use through Pool is to have the server be able to
make queries to our postgres database and eventually be able to return it to the client*/

const Pool = require("pg").Pool;

//new instance of pool allowing us to connect postgresql to server

const pool = new Pool({
    user: "postgres",
    password: "Mazda#626",
    host: "localhost",
    port: 5432,
    database: "perntodo"
});

//takes the instance of pg / Pool defined as 'pool' and exports it as a module that can be required from the 'db' file
module.exports = pool;