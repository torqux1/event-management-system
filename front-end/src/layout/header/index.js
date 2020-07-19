import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { Link, useHistory } from 'react-router-dom'
import { useStyles } from './styles'
import auth from './../../services/auth.service'

function Header(props) {
  const classes = useStyles()
  let history = useHistory()

  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/">
          <Button className={classes.navLink}>Home</Button>
        </Link>
        {props.isLoggedIn ? (
          <React.Fragment>
            <Link to="/event/create">
              <Button className={classes.navLink}>Create event</Button>
            </Link>
            <Link to="#">
              <Button
                className={classes.navLink}
                onClick={() => {
                  auth.logout()
                  props.handleLogout()
                  history.push('/login')
                }}
              >
                Logout
              </Button>
            </Link>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Link to="/login">
              <Button className={classes.navLink}>Login</Button>
            </Link>
            <Link to="/register">
              <Button className={classes.navLink}>Register</Button>
            </Link>
          </React.Fragment>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
