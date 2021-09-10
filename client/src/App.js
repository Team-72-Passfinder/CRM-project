import React from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'

import Login from './pages/login/login'
import Home from './pages/home/home'

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/'>

                </Route>
                <Route exact path='/login'>
                    <Login />
                </Route>
                <Route exact path='/home'>
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

export default App