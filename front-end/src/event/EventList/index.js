import React from 'react';
import EventCard from './eventCard'


export default function EventList() {

    let events = [
        {
            eventId: 5,
            title: 'Pesho birthday',
            description: 'Pesho birthday party',
            date: '20.20.2020',
            time: '22:22:22',
        },
        {
            eventId: 6,
            title: 'Penka birthday',
            description: 'Penka birthday party',
            date: '21.20.2020',
            time: '22:22:22',
        }
        ,
        {
            eventId: 6,
            title: 'Penka birthday',
            description: 'Penka birthday party',
            date: '21.20.2020',
            time: '22:22:22',
        }
        ,
        {
            eventId: 6,
            title: 'Penka birthday',
            description: 'Penka birthday party',
            date: '21.20.2020',
            time: '22:22:22',
        }
        ,
        {
            eventId: 6,
            title: 'Penka birthday',
            description: 'Penka birthday party',
            date: '21.20.2020',
            time: '22:22:22',
        }
        ,
        {
            eventId: 6,
            title: 'Penka birthday',
            description: 'Penka birthday party',
            date: '21.20.2020',
            time: '22:22:22',
        }
    ]

    const cardsArray = events.map((event) => (
        <EventCard
        key={event.eventId} 
        title={event.title}
        description={event.description}
        date={event.date}
        time={event.time}
        />
  
    ));

    return (
        <div>
        {cardsArray}
        </div>
    )
} 

