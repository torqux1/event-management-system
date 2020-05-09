import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container } from '@material-ui/core'
import Dashboard from './Dashboard.js'

function EventDashboard() {
  const { id } = useParams()

  useEffect(() => {
    console.log('Hello from mount or state change')
    return () => {
      console.log('Hello from cleanup')
    }
  })
  return (
    <Container>
      <Dashboard />
    </Container>
  )
}

export default EventDashboard
