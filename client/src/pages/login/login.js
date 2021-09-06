import React, { useState } from 'react'
import { BsFillExclamationTriangleFill, BsExclamationCircleFill } from 'react-icons/bs'

import { login } from '../../api'

import './login.css'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState()

    const submitHandler = e => {
        e.preventDefault();

        login(username, password).then(null, reason => {
            if(reason === 'Unauthorized') {
                setAlert(
                    <div className='error'>
                        <BsFillExclamationTriangleFill className='danger-icon' />
                        <div className='error-message'>Incorrect username or password</div>
                    </div>
                )
            } else {
                setAlert(
                    <div className='error'>
                        <BsFillExclamationTriangleFill className='danger-icon' />
                        <div className='error-message'>Authentication failed. Please retry again</div>
                    </div>
                )
            }
        })
    }

    return (
        <div className='flex-container'>
            <div id='loginContent'>
                <div id='content-container'>
                    <h1>Login</h1>
                    <div id='alert'>
                        {alert}
                    </div>
                    <form>
                        <input id='username-field' name='username' type='text' placeholder='Username' onChange={e => { setUsername(e.target.value) }} />
                        <input id='password-field' type='password' placeholder='*********' onChange={e => { setPassword(e.target.value) }} />
                        <a id='forgot-password-link' href='/forgot-password'>Forgot password?</a>
                        <input type='submit' onClick={submitHandler} />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;