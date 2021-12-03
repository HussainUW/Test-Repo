import React, {Fragment} from "react";
import './App.css';

//components

import InputTodo from "./components/InputTodo";
//Fragments are used in react to return a number of child elements grouped together, as if we were running a number 
//of functions one after another, rendering frontend in a group

function App() {
  return( 
  <Fragment>
    <div className="container">
      <h3 className="text-center mt-5">Monday Todo List</h3>
      <InputTodo type = {'mon'} />
      <h3 className="text-center mt-5">Tuesday Todo List</h3>
      <InputTodo type = {'tue'} />
      <h3 className="text-center mt-5">Wednesday Todo List</h3>
      <InputTodo type = {'wed'} />
      <h3 className="text-center mt-5">Thursday Todo List</h3>
      <InputTodo type = {'thu'} />
      <h3 className="text-center mt-5">Friday Todo List</h3>
      <InputTodo type = {'fri'} />
      <h3 className="text-center mt-5">Saturday Todo List</h3>
      <InputTodo type = {'sat'} />
      <h3 className="text-center mt-5">Sunday Todo List</h3>
      <InputTodo type = {'sun'} />
    </div>
  </Fragment>
  );
}

export default App;
