import React, { useState } from 'react'

import { Box, Container, TextField, Button, Link, Alert, Typography } from '@mui/material'

import { login } from '../../api'

function Login() {
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
        <Container sx={{ display: 'flex', width: '100vw', height: '100vh', justifyContent: 'center', alignItems: 'center' }} maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '300px',
                    maxWidth: '80vw'
                }}
            >
                <Typography
                    sx={{
                        mb: 2,
                    }}
                    variant='h5'
                >
                    Login
                </Typography>
                <Box sx={{ width: '300px' }}>
                    {alert}
                </Box>
                <TextField
                    margin="normal"
                    variant="outlined"
                    size="small"
                    fullWidth
                    label="username"
                    onChange={e => setUsername(e.target.value)}
                />
                <TextField
                    margin="normal"
                    variant="outlined"
                    type="password"
                    size="small"
                    fullWidth
                    label="password"
                    onChange={e => setPassword(e.target.value)}
                />
                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'right', mb: 2 }}>
                    <Link href='/forgot-password' underline="none">
                        Forgot password?
                    </Link>
                </Box>
                <Button
                    margin="normal"
                    variant='contained'
                    color='primary'
                    fullWidth
                    onClick={submitHandler}
                >
                    Login
                </Button>
            </Box>
        </Container>
    );
}

export default Login;