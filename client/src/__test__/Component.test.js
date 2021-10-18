import React from 'react';
import Navbar from '../components/Navbar';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import EventInvite from '../components/EventInvite';
import DeleteEvent from '../pages/event/deleteEvent';

it('renders Navbar page without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('renders Navbar EventInvite without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <EventInvite />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('renders Navbar DeleteEvent without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <DeleteEvent />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
