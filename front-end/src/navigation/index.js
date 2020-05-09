import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from '../auth/login'
import Register from '../auth/register'
import Home from '../home'
import Header from '../layout/header'
import EventDashboard from './../event/EventDashboard.js'

function Navigation() {
  return (
    <Router>
      <Header></Header>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/event/:id" component={EventDashboard} />
      </Switch>
    </Router>
  )
}

export default Navigation
