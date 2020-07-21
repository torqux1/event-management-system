import React, { useState, useEffect } from 'react'
import { api } from './../config/axios'

function OrganizationDashboard(props) {
  const [organization, setOrganization] = useState({})
  useEffect(() => {
    api
      .get('/organization/' + props.match.params.id)
      .then(({ data }) => {
        setOrganization(data.organization)
      })
      .catch(console.error)
  }, [])
  return <div>{organization.title}</div>
}

export default OrganizationDashboard
