import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "../auth/login";
import Register from "../auth/register";
import Home from "../home";
import Header from "../layout/header";

function Navigation() {
  return (
    <Router>
      <Header></Header>
      <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
        </Switch>
    </Router>
    
  );
}

export default Navigation;
