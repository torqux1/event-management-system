import React, { useEffect, useState } from 'react'
import EventDetails from './EventDetails.js'
import { Grid } from '@material-ui/core'
import axios from 'axios'
import Survey from 'material-survey/components/Survey'

function EventInvitationForm() {
  let [event, setEvent] = useState({})
  let [host, setHost] = useState({})
  let [questions, setQuestions] = useState([])

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

    setQuestions([
      {
        id: 56,
        content: 'What do you want to eat?',
        answers: [
          {
            id: 33,
            content: 'Fries',
          },
          {
            id: 56,
            content: 'Lamb',
          },
          {
            id: 23,
            content: 'Salad',
          },
        ],
      },
      {
        id: 66,
        content: 'How are you going to come tho the event',
        answers: [
          {
            id: 55,
            content: 'On foot',
          },
          {
            id: 77,
            content: 'By bus',
          },
          {
            id: 99,
            content: 'With my car',
          },
          {
            id: 2,
            content: 'By some other means',
          },
        ],
      },
      {
        id: 77,
        content: 'What do you want to drink?',
        answers: [
          {
            id: 45,
            content: 'Champagne',
          },
          {
            id: 47,
            content: 'Beer',
          },
        ],
      },
    ])
  }, [])

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
