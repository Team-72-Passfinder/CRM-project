import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import ContactList from './pages/ContactList/ContactList';
import Contact from './pages/Contact/Contact';
import CreateContact from './pages/CreateContact/CreateContact';
import Login from './pages/login/login';
import Home from './pages/home/home';
import Frontpage from './pages/frontpage/frontpage';
import EditContact from './pages/EditContact/EditContact';
import Profile from './pages/Profile/profile';
import Event from './pages/event/event';
import EditEvent from './pages/event/editEvent';
import { ThemeProvider } from '@mui/material/styles';

import theme from './theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
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
          <Route path="/contact/edit/:id">
            <EditContact />
          </Route>
          <Route exact path="/contact/:id">
            <Contact />
          </Route>
          <PrivateRoute path="/profile">
            <Profile />
          </PrivateRoute>
          <Route exact path="/contact">
            <ContactList />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/event/:id">
            <Event />
          </Route>
          <Route exact path="/event/:id/edit">
            <EditEvent />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

function PrivateRoute({ children, ...rest }) {
  let auth = localStorage.getItem('token-myapp');

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default App;
