import React, { useState, useEffect } from 'react'
import { getEvents } from '../../api.js';

const sampleEvent = {
    date: '1/10/2021',
    time: '14:00',
    contact: 'Alice'
}

// class Event extends React.Component {
//     render() {
//       return (
//         <div className="event">
//             <Grid>
//           <ul>
//             <li>{sampleEvent.date}</li>
//             <li>{sampleEvent.time}</li>
//             <li>{sampleEvent.contact}</li>
//           </ul>
//           </Grid>
//         </div>
//       );
//     }
//   }

// class Home extends React.Component {
//     render() {
//       return (
//         <div className="event">
//           <Event/>
//         </div>
//       );
//     }
//   }

// Created using function hooks
function Home() {
    const [events, setEvents] = useState([])

    useEffect(() => {
        getEvents().then(res => {
            console.log(res)
            setEvents(res)
        });
    }, [])

    return (
        <div id='events'>
            {events.map((event) => {
                return (
                    <div id={event._id} key={event._id}>
                        {event._id}
                        {event.name}
                    </div>
                )
            })}
        </div>
    )
}


// Created using react components
// class Home extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {events:[]}
//     }

//     componentDidMount() {
//         getEvents().then(res => {
//             console.log(res)
//             this.setState({ events: res });
//         });
//     }

//     render() {
//         return (
//             <div id='events'>
//                 {this.state.events.map((event) => {
//                     return (
//                         <div id={event._id} key={event._id}>
//                             {event._id}
//                             {event.name}
//                         </div>
//                     )
//                 })}
//             </div>
//         )
//     }
// }

export default Home;