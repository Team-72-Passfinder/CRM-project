// import { set } from 'mongoose'
import React, { useState } from 'react'
// import { BsFillExclamationTriangleFill, BsExclamationCircleFill } from 'react-icons/bs'

import { Typography, Box, TextField, Button, makeStyles, Link } from '@material-ui/core'
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
    link: {
        
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
        <div className={classes.root}>
            <Typography className={classes.title}>
                Login
            </Typography>
            {alert}
            <form className={classes.form}>
                <TextField
                    className={classes.input}
                    variant='outlined'
                    size='small'
                    fullWidth
                    label='username'
                    onChange={e => setUsername(e.target.value)} />
                <TextField
                    className={classes.input}
                    variant='outlined'
                    type='password'
                    size='small'
                    fullWidth
                    label='password'
                    onChange={e => setPassword(e.target.value)} />
                <Link className={classes.link} href='/forgot-password'>
                    Forgot password?
                </Link>
                <Button
                    className={classes.button}
                    variant='contained'
                    color='primary'
                    fullWidth
                    onClick={submitHandler}
                >
                    Login
                </Button>
            </form>
        </div>
    );
}

export default Login;