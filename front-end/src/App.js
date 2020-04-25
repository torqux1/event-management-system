import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import Home from './Home'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            <Button>Home</Button>
          </Link>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
          <Link to="/register">
            <Button>Register</Button>
          </Link>
        </Toolbar>
      </AppBar>

      <Container>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Container>
    </Router>
  )
}

export default App
