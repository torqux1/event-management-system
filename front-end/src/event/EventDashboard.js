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
import { api } from './../config/axios.js'
import EventDetails from './EventDetails.js'
import EventStatistics from './EventStatistics.js'
import moment from 'moment'
import MeetingBox from './../meeting/MeetingBox'
import toast from 'toasted-notes'

function EventDashboard(props) {
  let [event, setEvent] = useState({})
  let [host, setHost] = useState({})
  let [inviteMail, setInviteMail] = useState('')
  let [statistics, setStatistics] = useState([])

  function createMeeting() {
    api
      .post('/meeting/create', {
        title: `${event.title}'s meeting`,
        event: event.id,
      })
      .then(({ data }) => {
        if (data.success) {
          const newEvent = Object.assign({  }, event)
          newEvent.meeting = data.meeting
          setEvent(newEvent)
          toast.notify('A meeting has been created!', {
            position: 'bottom-left',
            duration: 3000,
          })
        } else {
          toast.notify(data.message, {
            position: 'bottom-right',
            duration: 3000,
          })
        }
      })
      .catch((error) => {
        console.error(error)
        toast.notify('Error while creating a meeting', {
          position: 'bottom-right',
          duration: 3000,
        })
      })
  }

  useEffect(() => {
    api.get(`/event/${props.match.params.id}`).then(({ data }) => {
      console.log(data)
      setEvent({
        id: data.event._id,
        title: data.event.title,
        price: data.event.price,
        description: data.event.description,
        organization: data.event.organization,
        meeting: data.meeting,
        dateTime: `${moment(data.event.date).format('DD-MM-YYYY')} ${moment(
          data.event.time
        ).format('HH:mm')}`,
      })
      setStatistics(data.statistics)
      setHost({
        fullName: `${data.event.user.firstName} ${data.event.user.lastName}`,
      })
    })
  }, [props.match.params.id])

  function inviteByMail() {
    if (inviteMail) {
      api
        .post('/event/invite-by-mail', {
          email: inviteMail,
        })
        .then((res) => {
          console.log('inviteby mail res')
        })
        .catch(console.error)
    }
  }

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item lg={1} md={1} sm={false} />
        <Grid item lg={7} md={7} sm={12}>
          <EventDetails event={event} host={host} />
          {statistics.length ? (
            <Box my={3}>
              <Paper>
                <Box p={2}>
                  <EventStatistics statistics={statistics} />
                </Box>
              </Paper>
            </Box>
          ) : (
            ''
          )}
        </Grid>
        <Grid item lg={3} md={3} sm={12}>
          <Box my={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2">
                  Meeting
                </Typography>
                {event.meeting ? (
                  <Typography variant="body2" component="p">
                    {event.meeting.title}
                  </Typography>
                ) : (
                  'A meeting has not yet been created'
                )}
              </CardContent>
              {!event.meeting ? (
                <CardActions>
                  <Button
                    color="primary"
                    variant="outlined"
                    fullWidth={true}
                    onClick={createMeeting}
                  >
                    Create
                  </Button>
                </CardActions>
              ) : (
                ''
              )}
            </Card>
          </Box>
          <Box my={3}>
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
                  <Link to={`/event/invitation/${event.id}`}>
                    {`${process.env.REACT_APP_API_URL}/event/invitation/${event.id}`}
                  </Link>
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Box my={3}>
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
          {/* TODO: make it work */}
          {/* <Box my={3}>
            <Button variant="contained" fullWidth={true}>
              Delete
            </Button>
          </Box> */}
        </Grid>
        <Grid item lg={1} md={1} sm={false} />
      </Grid>
      {event.meeting ? (
        <MeetingBox
          id={event.meeting._id}
          title={event.meeting.title}
          subtitle={event.meeting.description}
        />
      ) : (
        ''
      )}
    </Box>
  )
}

export default EventDashboard
