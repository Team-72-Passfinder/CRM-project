import React, { useEffect, useState } from 'react'

// import { Typography, TextField, Button, makeStyles, Box, InputAdornment } from '@material-ui/core'

import { Box, Typography } from '@material-ui/core'
// import EmailIcon from '@material-ui/icons/Email';
// import AddIcon from '@material-ui/icons/Add';

// import Navbar from '../../components/Navbar/Navbar'
import { addContact } from '../../api';
// import InputStandard from '../../components/Input/InputStandard';

// const useStyles = makeStyles((theme) => ({
//     title: {
//         fontSize: '28px',
//         marginTop: theme.spacing(5),
//         marginBottom: theme.spacing(3)
//     },
//     form: {
//         display: 'flex',
//         // width: '300px',
//         width: '80%',
//         alignItems: 'center',
//         flexDirection: 'column'
//     },
//     formContainer: {
//         display: 'flex',
//         width: '100vw',
//         flexDirection: 'column',
//         alignItems: 'center',
//     },
//     TextField: {
//         marginTop: theme.spacing(1),
//         marginBottom: theme.spacing(1),
//         // marginInlineEnd: '20px'
//     },
//     input: {
//         // color: 'blue'
//     },
//     submitButton: {
//         marginTop: '20px',
//     },
//     hbox: {
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'space-between'
//     }
// }))

function CreateContact() {
    // const classes = useStyles();

    // const [contact, setContact] = useState({ firstName: 'none', lastName: 'none', email: 'none', phoneNumber: 'none', dateOfBirth: '2021-09-00', biography: 'none' })
    // const [submitDisabled, setSubmitDisabled] = useState(true)

    // const emptyFieldErrorMessage = 'This field is required'

    // function saveContact() {
    //     addContact(contact)
    // }

    // useEffect(() => {
    //     const inputs = document.querySelectorAll('input')
    //     console.log(contact)
    //     Array.from(inputs).filter(input => {
    //         if(input.required === true) {
    //             if(!input.validity.valid) {
    //                 setSubmitDisabled(true)
    //             } else {
    //                 setSubmitDisabled(false)
    //             }
    //         }
    //     })
    // }, [contact])

    return (
        // <div className={classes.root}>
        //     <Navbar />
        //     <Box className={classes.formContainer}>
        //         <Typography className={classes.title}>
        //             Contact form
        //         </Typography>
        //         <form className={classes.form}>
        //             <TextField
        //                 className={classes.TextField}
        //                 label="First Name"
        //                 variant='outlined'
        //                 size='small'
        //                 fullWidth
        //                 error={contact.firstName === ''}
        //                 onClick={e => contact.firstName === 'none' && setContact(prev => ({ ...prev, firstName: '' }))}
        //                 onChange={e => setContact(prev => ({ ...prev, firstName: e.target.value }))}
        //                 helperText={contact.firstName === '' && emptyFieldErrorMessage}
        //                 required
        //             />
        //             <TextField
        //                 className={classes.TextField}
        //                 label="Last Name"
        //                 variant='outlined'
        //                 size='small'
        //                 fullWidth
        //                 error={contact.lastName === ''}
        //                 onClick={e => contact.lastName === 'none' && setContact(prev => ({ ...prev, lastName: '' }))}
        //                 onChange={e => setContact(prev => ({ ...prev, lastName: e.target.value }))}
        //                 helperText={contact.lastName === '' && emptyFieldErrorMessage}
        //                 required
        //             />
        //             <TextField
        //                 className={classes.TextField}
        //                 label="Birthday"
        //                 variant='outlined'
        //                 size='small'
        //                 type="date"
        //                 fullWidth
        //                 defaultValue='Birthday'
        //                 InputLabelProps={{
        //                     shrink: true,
        //                 }}
        //                 onChange={e => setContact(prev => ({ ...prev, dateOfBirth: e.target.value })) }
        //             />
        //             <TextField
        //                 className={classes.TextField}
        //                 label="Email"
        //                 variant='outlined'
        //                 size='small'
        //                 type='email'
        //                 fullWidth
        //                 error={((contact.email !== '' && contact.email !== 'none') && !/\S+@\S+\.\S+/.test(contact.email))}
        //                 onClick={e => contact.email === 'none' && setContact(prev => ({ ...prev, email: '' }))}
        //                 onChange={e => setContact(prev => ({ ...prev, email: e.target.value })) }
        //                 helperText={(((contact.email !== '' && contact.email !== 'none') && !/\S+@\S+\.\S+/.test(contact.email)) && 'Invalid email') }
        //             />
        //             <TextField
        //                 className={classes.TextField}
        //                 label="Phone Number"
        //                 variant='outlined'
        //                 size='small'
        //                 type='tel'
        //                 fullWidth
        //                 error={((contact.phoneNumber !== '' && contact.phoneNumber !== 'none') && isNaN(contact.phoneNumber))}
        //                 onClick={e => contact.phoneNumber === 'none' && setContact(prev => ({ ...prev, phoneNumber: '' }))}
        //                 onChange={e => setContact(prev => ({ ...prev, phoneNumber: e.target.value })) }
        //                 helperText={(((contact.phoneNumber !== '' && contact.phoneNumber !== 'none') && isNaN(contact.phoneNumber)) && 'Must contain only numbers')}
        //             />
        //             <TextField
        //                 className={classes.TextField}
        //                 label='bio'
        //                 variant='outlined'
        //                 size='small'
        //                 fullWidth
        //                 multiline
        //                 rows={2}
        //                 onClick={e => contact.biography === 'none' && setContact(prev => ({ ...prev, biography: '' }))}
        //                 onChange={e => setContact(prev => ({ ...prev, biography: e.target.value }))}
        //             />
        //             <Button className={classes.submitButton} variant="contained" color="primary" fullWidth onClick={saveContact} disabled={submitDisabled}>
        //                 Save
        //             </Button>
        //         </form>
        //     </Box>
        // </div>
        <Box sx={{ display: 'flex', width: '100vw', alignItems: 'center', flexDirection: 'column' }}>
            <Typography>
                Contact form
            </Typography>
        </Box>
    )
}

export default CreateContact