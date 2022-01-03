/*creates main database*/ 
CREATE DATABASE perntodo;

/*creates a table / model for a to-do element within the database characterized by an element id number (serialized)
and a description*/ 
CREATE TABLE courses(
    id SERIAL PRIMARY KEY,
    course VARCHAR(15),
    student_id BIGINT REFERENCES students (id)
);

CREATE TABLE students(
    id SERIAL PRIMARY KEY,
    student VARCHAR(8),
    UNIQUE(student)
);

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    type VARCHAR(15),
    student_id BIGINT REFERENCES students (id)
);

CREATE TABLE tasks(
    id SERIAL PRIMARY KEY,
    task VARCHAR(255),
    course_id BIGINT REFERENCES courses (id)
);





