import * as React from "react"
import { BrowserRouter as Router, Route, Redirect, Switch, BrowserRouter } from 'react-router-dom';
import Schedule from "./components/schedule";
import Login from './components/Login';
import Auth from "./components/Auth";

export const ProtectedRoute = ({ children, ...rest }) => {
  return (
    <Route {...rest} render={() => {
      if (Auth.isAuthenticated()) {
        return children
      }
      else {
        return <Redirect to={
          "/"
        } />
      }
    }}
    />
  );
};

function App() {
  return (
    <BrowserRouter>
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/schedule/:student">
            <Schedule />
          </Route>
        </Switch>
      </Router>
    </BrowserRouter>
  );
}



export default App;
