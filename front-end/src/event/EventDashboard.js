import React, { useEffect, useState } from 'react'
import {
  Box,
  Grid,
  Typography,
  CardContent,
  Card,
  CardActions,
  Button,
  TextField,
  Paper,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import axios from 'axios'
import EventDetails from './EventDetails.js'
import EventStatistics from './EventStatistics.js'

function EventDashboard() {
  let [event, setEvent] = useState({})
  let [host, setHost] = useState({})
  let [inviteMail, setInviteMail] = useState("")
  let [statistics, setStatistics] = useState([])

  useEffect(() => {
    // axios.get(process.env.REACT_APP_API_URL).then((res) => {
    //   setEvent({
    //     id: 4,
    //     name: "Pesho's birthday party",
    //     dateTime: '12/05/2019 12:00',
    //   })
    // })

    setEvent({
      id: 4,
      title: "Pesho's birthday party",
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et libero semper, hendrerit nisi vitae, laoreet erat. Etiam dapibus eleifend varius. Vestibulum iaculis finibus sagittis. In dictum, elit non dignissim euismod, risus quam blandit justo, vitae rutrum est leo quis mauris. Maecenas nec porttitor justo, sit amet viverra risus. Vestibulum dapibus, sem sed maximus dapibus, sem elit volutpat est, ut maximus velit tortor ut dolor. Quisque eleifend, dui non iaculis lacinia, mauris sem euismod est, vitae malesuada massa sem eget urna.',
      dateTime: '12/05/2019 12:00',
    })

    setHost({
      fullName: 'Pesho Goshov',
    })

    setStatistics([
      {
        id: 1,
        content: 'What do you want to eat?',
        answers: [
          {
            id: 1,
            name: 'Fries',
            value: 5,
          },
          {
            id: 2,
            name: 'Lamb',
            value: 1,
          },
          {
            id: 3,
            name: 'Salad',
            value: 10,
          },
        ],
      },
      {
        id: 2,
        content: 'How are you going to come tho the event',
        answers: [
          {
            id: 1,
            name: 'On foot',
            value: 5,
          },
          {
            id: 2,
            name: 'By bus',
            value: 0,
          },
          {
            id: 3,
            name: 'With my car',
            value: 10,
          },
          {
            id: 4,
            name: 'Some other means',
            value: 7,
          },
        ],
      },
      {
        id: 3,
        content: 'What do you want to drink?',
        answers: [
          {
            id: 1,
            name: 'Champagne',
            value: 5,
          },
          {
            id: 2,
            name: 'Beer',
            value: 50,
          },
        ],
      },
    ])
  }, [])

  function inviteByMail() {
    if (inviteMail) {
      axios.post(process.env.REACT_APP_API_URL + '/event/invite-by-mail', {
        email: inviteMail
      }).then((res) => {
        console.log('inviteby mail res')
      }).catch(console.error)
    }
  }

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item lg={1} md={1} sm={false} />
        <Grid item lg={7} md={7} sm={12}>
          <EventDetails event={event} host={host} />
          <Box my={3}>
            <Paper>
              <Box p={2}>
                <EventStatistics statistics={statistics} />
              </Box>
            </Paper>
          </Box>
        </Grid>
        <Grid item lg={3} md={3} sm={12}>
          <Box my={5}>
            <Card>
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
          </Box>
          <Box my={5}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2">
                  Invite by email
                </Typography>
                <Typography variant="body2" component="p">
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    onChange={(event) => setInviteMail(event.target.value)}
                  />
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  color="primary"
                  variant="outlined"
                  fullWidth={true}
                  onClick={inviteByMail}
                >
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
          </Box>

          <Box my={5}>
            <Card>
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
          </Box>
        </Grid>
        <Grid item lg={1} md={1} sm={false} />
      </Grid>
    </Box>
  )
}

export default EventDashboard
