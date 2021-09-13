// import { set } from 'mongoose'
import React, { useState } from 'react'
// import { BsFillExclamationTriangleFill, BsExclamationCircleFill } from 'react-icons/bs'

import { Typography, Box, TextField, Button, makeStyles} from '@material-ui/core'
import { Alert } from '@material-ui/lab'

import { login } from '../../api'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '100vw',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginLeft: '-8px',
        marginBottom: '-8px',
        marginTop: '-8px',
    },
    title: {
        fontSize: '28px',
        fontWeight: '600',
        marginBottom: theme.spacing(2),
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '250px'
    },
    input: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    button: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    }
}))

function Login() {
    const classes = useStyles()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState()

    const submitHandler = e => {
        e.preventDefault();

        login(username, password).then(null, reason => {
            if(reason === 'Unauthorized') {
                setAlert(
                    <Alert severity='error'>
                        Incorrect username or password
                    </Alert>
                )
            } else {
                setAlert(
                    <Alert severity='error'>
                        Authentication failed. Please retry again
                    </Alert>
                )
            }
        })
    }

    return (
        // <div className='flex-container'>
        //     <div id='loginContent'>
        //         <div id='content-container'>
        //             <h1>Login</h1>
        //             <div id='alert'>
        //                 {alert}
        //             </div>
        //             <form>
        //                 <input id='username-field' name='username' type='text' placeholder='Username' onChange={e => { setUsername(e.target.value) }} />
        //                 {/* Maybe not going to use this */}
        //                 {/* <div className='empty-warning' hidden>
        //                     <BsExclamationCircleFill className='circle-exclamaination' />
        //                     This field cannot be empty
        //                 </div> */}
        //                 <input id='password-field' type='password' placeholder='*********' onChange={e => { setPassword(e.target.value) }} />
        //                 {/* Maybe not going to use this */}
        //                 {/* <div className='empty-warning' hidden>
        //                     <BsExclamationCircleFill className='circle-exclamaination' />
        //                     This field cannot be empty
        //                 </div> */}
        //                 <a id='forgot-password-link' href='/forgot-password'>Forgot password?</a>
        //                 <input type='submit' onClick={submitHandler} />
        //             </form>
        //         </div>
        //     </div>
        // </div>
        <div className={classes.root}>
            <Typography className={classes.title}>
                Login
            </Typography>
            {alert}
            <form className={classes.form}>
                <TextField className={classes.input} variant='outlined' size='small' fullWidth label='username' onChange={e => setUsername(e.target.value)} />
                <TextField className={classes.input} variant='outlined' type='password' size='small' fullWidth label='password' onChange={e => setPassword(e.target.value)} />
                <Button className={classes.button} variant='contained' color='primary' fullWidth onClick={submitHandler}>
                    Login
                </Button>
            </form>
        </div>
    );
}

export default Login;