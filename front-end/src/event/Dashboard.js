import React from 'react'
import {
  Box,
  Grid,
  Typography,
  CardContent,
  Card,
  CardActions,
  Button,
  Divider,
  TextField,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})

function Dashboard() {
  const classes = useStyles()

  let event = {
    id: 4,
  }
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item lg={9} md={12}></Grid>
        <Grid item lg={3} md={12}>
          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h6" component="h2">
                Meeting
              </Typography>
              <Typography variant="body2" component="p">
                Meeting starts: 20/12/2019
                <br />
                Meeting Ends: 20/12/2019
              </Typography>
            </CardContent>
            <CardActions>
              <Link
                to={{
                  pathname: `/event/${event.id}/meeting`,
                }}
              >
                <Button color="primary" variant="outlined" fullWidth={true}>
                  Join
                </Button>
              </Link>
            </CardActions>
          </Card>

          <Divider />

          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h6" component="h2">
                Invite by email
              </Typography>
              <Typography variant="body2" component="p">
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                />
              </Typography>
            </CardContent>
            <CardActions>
              <Button color="primary" variant="outlined" fullWidth={true}>
                Invite
              </Button>
            </CardActions>
            <CardContent>
              <Typography variant="body2" component="p">
                or use this link: <br />
                <Link to="https://material-ui.com/system/spacing/">
                  https://material-ui.com/system/spacing/
                </Link>
              </Typography>
            </CardContent>
          </Card>

          <Divider />

          <Card className={classes.root} mx={100}>
            <CardContent>
              <Typography variant="h6" component="h2">
                Tickets bought
              </Typography>
              <Typography variant="body2" component="p">
                46
              </Typography>
            </CardContent>
            <CardActions>
              <Link
                to={{
                  pathname: `/event/${event.id}/payments`,
                }}
              >
                <Button color="primary" variant="outlined" fullWidth={true}>
                  Payment details
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard
