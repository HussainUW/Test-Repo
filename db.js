/*requiring module pg and storing it as variable 'Pool', this allows us to access the functionality of module pg
via the Pool variable. In our case the pg functionality we want to use through Pool is to have the server be able to
make queries to our postgres database and eventually be able to return it to the client*/

const Pool = require("pg").Pool;
require("dotenv").config();

//new instance of pool allowing us to connect postgresql to server

const devConfig = {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE
};

const proConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized: false
    }
}

const pool = new Pool(process.env.NODE_ENV === "production" ? proConfig : devConfig);

//takes the instance of pg / Pool defined as 'pool' and exports it as a module that can be required from the 'db' file
module.exports = pool;