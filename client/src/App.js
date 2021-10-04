import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ContactList from './pages/ContactList/ContactList';
import Contact from './pages/Contact/Contact';
import CreateContact from './pages/CreateContact/CreateContact';
import Login from './pages/login/login';
import Home from './pages/home/home';
import Frontpage from './pages/frontpage/frontpage';
import Event from './pages/event/event';
import EditEvent from './pages/event/editEvent';
import EventList from './pages/event/eventList';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Frontpage />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route path="/contact/add">
          <CreateContact />
        </Route>
        <Route exact path="/contact/:id">
          <Contact />
        </Route>
        <Route exact path="/contact">
          <ContactList />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/event">
          <EventList />
        </Route>
        <Route exact path="/event/:id">
          <Event />
        </Route>
        <Route exact path="/event/:id/edit">
          <EditEvent />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
