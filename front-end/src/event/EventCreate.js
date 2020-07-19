import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Container,
} from '@material-ui/core'
import EventForm from './CreationFlow/EventForm.js'
import QuestionsForm from './CreationFlow/QuestionsForm.js'
import OverviewAndComplete from './CreationFlow/OverviewAndComplete.js'
import api from './../config/axios'
import moment from 'moment'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}))

function EventCreate() {
  const history = useHistory()
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState(new Date())
  const [questions, setQuestions] = useState([])
  const [newQuestionContent, setNewQuestionContent] = useState('')
  const steps = ['Event parameters', 'Questions', 'Overview and complete']

  const handleNext = () => {
    if (activeStep + 1 === steps.length) {
      api
        .post(`/event/create`, {
          title,
          description,
          date,
          time,
          questions,
        })
        .then(({ data }) => {
          setTitle('')
          setDescription('')
          setDate(new Date())
          setTime(new Date())
          setQuestions([])
          setNewQuestionContent('')

          history.push('/event/' + data.event._id)
        })
        .catch(console.error)
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const addQuestion = (event) => {
    event.preventDefault()
    setQuestions([
      ...questions,
      {
        content: newQuestionContent,
        answers: [],
      },
    ])
    setNewQuestionContent('')
  }

  const addAnswer = (answerContent, questionIndex) => {
    const newQuestions = questions.slice()
    newQuestions[questionIndex].answers.push(answerContent)
    setQuestions(newQuestions)
  }

  const deleteAnswer = (questionIndex, answerIndex) => {
    const newQuestions = questions.slice()
    newQuestions[questionIndex].answers.splice(answerIndex, 1)
    setQuestions(newQuestions)
  }

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <EventForm
            title={title}
            description={description}
            date={date}
            time={time}
            setTitle={setTitle}
            setDescription={setDescription}
            setDate={setDate}
            setTime={setTime}
          />
        )
      case 1:
        return (
          <QuestionsForm
            questions={questions}
            addQuestion={addQuestion}
            newQuestionContent={newQuestionContent}
            setNewQuestionContent={setNewQuestionContent}
            addAnswer={addAnswer}
            deleteAnswer={deleteAnswer}
          />
        )
      case 2:
        return (
          <OverviewAndComplete
            event={{
              title,
              description,
              dateTime:
                moment(date).format('MM-DD-YYYY') +
                ' ' +
                moment(time).format('hh:mm'),
            }}
            questions={questions}
          />
        )
      default:
        return 'Unknown stepIndex'
    }
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        <Container>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed
              </Typography>
              <Button onClick={handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              {getStepContent(activeStep)}
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </Container>
      </div>
    </div>
  )
}

export default EventCreate
