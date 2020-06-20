
import React from 'react';
import './styles.css'

export default function EventCard(props) {
    const {title, description, date, time} = props;
    return (
        <div class="card">
        <h1>{title}</h1>
        <h2>Date and time:</h2>
        <p class="dateTime">{date} {time}</p>
        <p>{description}</p>
        <p><button>View event info</button></p> 
        </div>
    );
}