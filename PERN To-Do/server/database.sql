/*creates main database*/ 
CREATE DATABASE perntodo;

/*creates a table / model for a to-do element within the database characterized by an element id number (serialized)
and a description*/
 
CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);

