import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../auth/login";
import Register from "../auth/register";
import Home from "../home";
import Header from "../layout/header";
import Footer from "../layout/footer";

import EventDashboard from "./../event/EventDashboard.js";
import EventCreate from "./../event/EventCreate.js";
import EventInvitationForm from "./../event/EventInvitationForm.js";

function Navigation() {
  return (
    <Router>
      <Header></Header>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/event/invitation/:eventId" component={EventInvitationForm} />
        <Route path="/event/create" component={EventCreate} />
        <Route path="/event/:id" component={EventDashboard} />
      </Switch>
      <Footer></Footer>
    </Router>
  );
}

export default Navigation;
