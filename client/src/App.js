import React from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom'

import ContactList from './pages/ContactList/ContactList'
import Contact from './pages/Contact/Contact'
import CreateContact from './pages/CreateContact/CreateContact'
import Login from './pages/login/login'
import Home from './pages/home/home'
import Frontpage from './pages/frontpage/frontpage'

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    <Frontpage />
                </Route>
                <Route path='/contact/add'>
                    <CreateContact />
                </Route>
                <Route exact path='/contact/:id'>
                    <Contact />
                </Route>
                <Route exact path='/contact'>
                    <ContactList />
                </Route>
                <Route exact path='/home'>
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

export default App