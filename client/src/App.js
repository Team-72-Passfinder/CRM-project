import React from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'

// import Login from './pages/login/login'
import ContactList from './pages/ContactList/ContactList'
import Contact from './pages/Contact/Contact'
// import SignIn from './pages/Contact/contact'

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/'>

                </Route>
                <Route exact path='/login'>
                    {/* <Login /> */}
                </Route>
                <Route path='/contact/add'>

                </Route>
                <Route exact path='/contact/:id'>
                    <Contact />
                </Route>
                <Route exact path='/contact'>
                    <ContactList />
                </Route>
            </Switch>
        </Router>
    );
}

export default App