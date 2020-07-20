import React, { useEffect, useState } from 'react'
import EventDetails from './EventDetails.js'
import { Grid, Typography } from '@material-ui/core'
import Survey from 'material-survey/components/Survey'
import moment from 'moment'
import { api } from './../config/axios.js'

function EventInvitationForm(props) {
  const [event, setEvent] = useState({})
  const [host, setHost] = useState({})
  const [questions, setQuestions] = useState([])
  const [isStored, setIsStored] = useState(false)

  useEffect(() => {
    api.get(`/event/${props.match.params.eventId}`).then(({ data }) => {
      setEvent({
        id: data.event._id,
        title: data.event.title,
        description: data.event.description,
        dateTime: `${moment(data.event.date).format('DD-MM-YYYY')} ${moment(
          data.event.time
        ).format('HH:mm')}`,
      })

      setQuestions(data.event.questions)
    })

    setHost({
      fullName: 'Pesho Goshov',
    })
  }, [props.match.params.eventId])

  function submitInvitationForm(answers) {
    api
      .post(`/event/${event.id}/submit-invitation`, answers)
      .then((res) => {
        if (res.status === 201) {
          setIsStored(true)
        }
      })
      .catch(console.error)
  }

  return (
    <Grid container>
      <Grid item lg={1} sm={false} />
      <Grid item lg={10} sm={12}>
        <EventDetails event={event} host={host} />
        <Grid container>
          <Grid item lg={2} sm={false} />
          <Grid item lg={8} sm={12}>
            {isStored ? (
              <Typography variant="h4" component="h4">
                Your feedback was stored!
              </Typography>
            ) : (
              <Survey
                onFinish={submitInvitationForm}
                form={{
                  questions: questions.map(
                    ({ _id, content, answers, ...rest }) => {
                      return {
                        name: _id,
                        title: content,
                        choices: answers.map((answer) => answer.content),
                        type: 'checkbox',
                        isRequired: true,
                      }
                    }
                  ),
                }}
              />
            )}
          </Grid>
          <Grid item lg={2} sm={false} />
        </Grid>
      </Grid>
      <Grid item lg={1} sm={false} />
    </Grid>
  )
}

export default EventInvitationForm
