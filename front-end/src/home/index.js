import React from 'react'
import EventList from './../event/EventList/index.js'
import auth from './../services/auth.service'

export default function Home() {
  return auth.isLoggedIn() ? <EventList /> : <div>Home</div>
}
