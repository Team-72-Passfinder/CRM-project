import React from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'

import Login from './login/login'

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/'>

                </Route>
                <Route exact path='/login'>
                    <Login />
                </Route>
            </Switch>
        </Router>
    );
}

export default App