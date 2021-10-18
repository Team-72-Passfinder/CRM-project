import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Socials from './pages/Socials';
import Contact from './pages/Contact/Contact';
import Login from './pages/login/login';
import Home from './pages/home/home';
import Frontpage from './pages/frontpage/frontpage';
import EditContact from './pages/EditContact/EditContact';
import Profile from './pages/Profile/profile';
import Event from './pages/event/event';
import EditEvent from './pages/event/editEvent';
import EventList from './pages/event/eventList';
import Settings from './pages/Settings';
import UnauthorizedAccessPage from './pages/Error/unathorized-access';
import Register from './pages/Register/register';
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
          <Route exact path="/register">
            <Register />
          </Route>
          <PrivateRoute path="/socials/edit/:id">
            <EditContact />
          </PrivateRoute>
          <PrivateRoute exact path="/socials/:id">
            <Contact />
          </PrivateRoute>
          <PrivateRoute path="/profile">
            <Profile />
          </PrivateRoute>
          <PrivateRoute exact path="/socials">
            <Socials />
          </PrivateRoute>
          <PrivateRoute path="/settings">
            <Settings />
          </PrivateRoute>
          <PrivateRoute exact path="/home">
            <Home />
          </PrivateRoute>
          <PrivateRoute exact path="/events">
            <EventList />
          </PrivateRoute>
          <PrivateRoute exact path="/myevent/:id">
            <Event />
          </PrivateRoute>
          <PrivateRoute exact path="/myevent/edit/:id">
            <EditEvent />
          </PrivateRoute>
          <Route exact path="/unauthorized-access">
            <UnauthorizedAccessPage />
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
              pathname: '/unauthorized-access',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default App;
