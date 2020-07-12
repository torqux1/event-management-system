import React from 'react'
import { Box, Typography, Paper } from '@material-ui/core'

function EventDetails(props) {
  const { event, host, my = 3 } = props

  return (
    <Box my={my}>
      <Paper>
        <Box p={2}>
          <Typography variant="h5">{event.title}</Typography>
          <Typography>{event.description}</Typography>
          <Typography variant="overline" display="block" gutterBottom>
            {event.dateTime}
          </Typography>
          {Boolean(host) ? (
            <Box>
              Hosted by:
              <Typography variant="subtitle2" gutterBottom>
                {host.fullName}
              </Typography>
            </Box>
          ) : (
            ''
          )}
        </Box>
      </Paper>
    </Box>
  )
}

export default EventDetails
