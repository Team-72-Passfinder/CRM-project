import React, { useState } from 'react'
import './login.css'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dummyUser = {
        username: 'Benedict-J',
        password: '123ab'
    }

    const submitHandler = e => {
        e.preventDefault();

        if(dummyUser.username === username && dummyUser.password === password) {
            console.log('Working authentication')
        }
    }

    return (
        <div>
            <h1>Login Form</h1>
            <form>
                <input type='text' onChange={ e => { setUsername(e.target.value) }} />
                <input type='password' onChange={ e => { setPassword(e.target.value) }} />
                <input type='submit' onClick={submitHandler} />
            </form>
        </div>
    );
}

export default Login;