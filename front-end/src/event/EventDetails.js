import React from 'react'
import {
  Box,
  Typography,
  Paper,
} from '@material-ui/core'

function EventDetails(props) {
  let { event, host } = props

  return (
    <Box my={5}>
      <Paper>
        <Box p={2}>
          <Typography variant="h5">{event.title}</Typography>
          <Typography>{event.description}</Typography>
          <Typography variant="overline" display="block" gutterBottom>
            {event.dateTime}
          </Typography>
          Hosted by:
          <Typography variant="subtitle2" gutterBottom>
            {host.fullName}
          </Typography>
        </Box>
      </Paper>
    </Box>
  )
}

export default EventDetails
