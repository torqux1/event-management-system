import React, { useEffect, useState } from 'react'
import EventCard from './eventCard'
import api from './../../config/axios'
import toast from 'toasted-notes'
import 'toasted-notes/src/styles.css'

export default function EventList() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    api.get(`/event`).then(({ data }) => {
      if (data.success) {
        setEvents(data.events)
      } else {
        toast.notify('Error', {
          position: 'bottom-right',
          duration: 1500,
        })
      }
    })
  }, [])

  return (
    <div>
      {events.map((event) => (
        <EventCard
          key={event._id}
          id={event._id}
          title={event.title}
          description={event.description}
          date={event.date}
          time={event.time}
        />
      ))}
    </div>
  )
}
