import React, { useState, useEffect,Component } from 'react';
import { AppBar } from '@mui/material';
import { Button } from '@mui/material';
import { Card } from '@mui/material';
import { CardActions } from '@mui/material';
import { CardContent } from '@mui/material';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';


import { getEvent } from '../../api';
import { setEvent } from '../../api';
const useStyles = makeStyles((theme) => ({

  }));

function EditEvent() {
    const classes = useStyles();
    const [event, setEvent] = useState();

    useEffect(() => {
        let id = window.location.pathname.split('/')[2]
        getEvent(id).then((res) => {
          setEvent(res);
        });
      }, []);
      
      const getDate = (date) => {
        var jsDate = new Date(date);
        return jsDate.toLocaleString('en-GB', {timeZone: 'UTC'});
      };
      
      const [text, setText] = React.useState(
        
      );
    if (event!=null){
        return (
            
            <div className={classes.root}>
                
                {
   <React.Fragment>
   <EditText
     name='textbox'
     style={{ fontSize: '16px', border: '1px solid #ccc' }}
     value={text}
     defaultValue ={event.name}
     onChange={setText}

   />
   <EditText
     name='textbox'
     style={{ fontSize: '16px', border: '1px solid #ccc' }}
     value={text}
     defaultValue ={event.description}
     onChange={setText}

   />
      <EditText
     name='textbox'
     style={{ fontSize: '16px', border: '1px solid #ccc' }}
     value={text}
     defaultValue={getDate(event.dateTime)}
     onChange={setText}

   />
   <button onClick={e => setEvent(prev => ({ ...prev, name: e.target.value ,description: e.target.value, date: e.target.value})) }>Save</button>    <button >Exit</button>


   <br />

 </React.Fragment>
                }
            </div>
        );
    } else {
        return <h3> Loading...</h3>;
      }
    }
export default EditEvent;