import React, { Fragment } from "react";
// import './App.css';

//components

import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";
//Fragments are used in react to return a number of child elements grouped together, as if we were running a number 
//of functions one after another, rendering frontend in a group

function App() {
  return (
    <Fragment>
      <div class="conatiner flex-parent-element mt-1 ml-2">
        <div className="container flex-child-element">
          <h3 className="dark-grey text-center mt-5">Monday</h3>
          <InputTodo type={'mon'} />
        </div>
        <div className="container flex-child-element">
          <h3 className="dark-grey text-center mt-5">Tuesday</h3>
          <InputTodo type={'tue'} />
        </div>
        <div className="container flex-child-element">
          <h3 className="dark-grey text-center mt-5">Wednesday</h3>
          <InputTodo type={'wed'} />
        </div>
        <div className="container flex-child-element">
          <h3 className="dark-grey text-center mt-5">Thursday</h3>
          <InputTodo type={'thu'} />
        </div>
        <div className="container flex-child-element">
          <h3 className="dark-grey text-center mt-5">Friday</h3>
          <InputTodo type={'fri'} />
        </div>
        <div className="container flex-child-element">
          <h3 className="dark-grey text-center mt-5">Weekend</h3>
          <InputTodo type={'wknd'} />
        </div>
      </div>
    </Fragment>
  );
}


export default App;
