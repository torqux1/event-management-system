import React, { useState, useEffect } from 'react'
import { api } from './../config/axios'
import OrganizationDetails from './OrganizationDetails'
import { Box, Grid, List, ListItem, ListItemText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}))

function OrganizationDashboard(props) {
  const [organization, setOrganization] = useState({})
  const [dataLoaded, setDataLoaded] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    api
      .get('/organization/' + props.match.params.id)
      .then(({ data }) => {
        setOrganization(data.organization)
        setDataLoaded(true)
      })
      .catch(console.error)
  }, [props.match.params.id])
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item lg={2} md={2} sm={false}></Grid>
        <Grid item lg={8} md={8} sm={12}>
          {dataLoaded ? (
            <OrganizationDetails
              title={organization.title}
              description={organization.description}
              owner={organization.owner}
            />
          ) : (
            ''
          )}
        </Grid>
        <Grid item lg={2} md={2} sm={false}>
          <List className={classes.root}>
            <ListItem>
              <ListItemText primary="Photos" secondary="Jan 9, 2014" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Work" secondary="Jan 7, 2014" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Vacation" secondary="July 20, 2014" />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Box>
  )
}

export default OrganizationDashboard
