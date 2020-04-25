import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import Home from './Home'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  navLink: {
    color: '#fff',
  },
})

function App() {
  const classes = useStyles()
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            <Button className={classes.navLink}>Home</Button>
          </Link>
          <Link to="/login">
            <Button className={classes.navLink}>Login</Button>
          </Link>
          <Link to="/register">
            <Button className={classes.navLink}>Register</Button>
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
