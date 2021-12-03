import React, {Fragment} from "react";
import './App.css';

//components

import InputTodo from "./components/InputTodo";
//Fragments are used in react to return a number of child elements grouped together, as if we were running a number 
//of functions one after another, rendering frontend in a group

function App() {
  return( 
  <Fragment>
    <div class="flex-parent-element">
      <div className="container flex-child-element">
        <h3 className="text-center mt-5">Monday </h3>
        <InputTodo type = {'mon'} />
      </div>
      <div className="container flex-child-element">
        <h3 className="text-center mt-5">Tuesday </h3>
        <InputTodo type = {'tue'} />
      </div>
      <div className="container flex-child-element">  
        <h3 className="text-center mt-5">Wednesday </h3>
        <InputTodo type = {'wed'} />
      </div>
      <div className="container flex-child-element">  
        <h3 className="text-center mt-5">Thursday </h3>
        <InputTodo type = {'thu'} />
      </div>
      <div className="container flex-child-element">  
        <h3 className="text-center mt-5">Friday </h3>
        <InputTodo type = {'fri'} />
      </div>
      <div className="container flex-child-element">  
        <h3 className="text-center mt-5">Saturday </h3>
        <InputTodo type = {'sat'} />
      </div>
      <div className="container flex-child-element">  
        <h3 className="text-center mt-5">Sunday </h3>
        <InputTodo type = {'sun'} />
      </div>
    </div>
    </Fragment>
  );
}

export default App;
