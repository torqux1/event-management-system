import React, { useEffect, useState } from 'react'
import EventDetails from './EventDetails.js'
import { Grid } from '@material-ui/core'
import axios from 'axios'
import Survey from 'material-survey/components/Survey'
import moment from 'moment'
import api from './../config/axios.js'

function EventInvitationForm(props) {
  let [event, setEvent] = useState({})
  let [host, setHost] = useState({})
  let [questions, setQuestions] = useState([])

  useEffect(() => {
    api.get(`/event/${props.match.params.eventId}`).then(({ data }) => {
      console.log(data)
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
    axios
      .post(process.env.REACT_APP_API_URL, answers)
      .then((res) => {})
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
            <Survey
              onFinish={submitInvitationForm}
              form={{
                questions: questions.map(
                  ({ id, content, answers, ...rest }) => {
                    return {
                      name: id,
                      title: content,
                      choices: answers.map((answer) => answer.content),
                      type: 'checkbox',
                      isRequired: true,
                    }
                  }
                ),
              }}
            />
          </Grid>
          <Grid item lg={2} sm={false} />
        </Grid>
      </Grid>
      <Grid item lg={1} sm={false} />
    </Grid>
  )
}

export default EventInvitationForm
