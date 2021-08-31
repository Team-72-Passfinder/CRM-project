import { Grid } from '@material-ui/core';
import React from 'react'
import CenteredGrid from './centredgrid.js';
  

const sampleEvent = {
    date: '1/10/2021',
    time: '14:00',
    contact: 'Alice'
}

class Event extends React.Component {
    
    render() {
      return (
        <div className="event">
            <Grid>
          <ul>
            <li>{sampleEvent.date}</li>
            <li>{sampleEvent.time}</li>
            <li>{sampleEvent.contact}</li>
          </ul>
          </Grid>
        </div>
      );
    }
  }

class Home extends React.Component {
    render() {
      return (
        <div className="event">
          <Event/>
        </div>
      );
    }
  }
  
export default Home;