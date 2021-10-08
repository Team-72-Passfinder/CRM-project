/*
https://stackoverflow.com/questions/46687271/warning-failed-prop-type-the-prop-open-is-marked-as-required-in-snackbar-but
https://www.toptal.com/react/testing-react-hooks-tutorial
*/

import React from 'react';
import ContactList from '../pages/ContactList/ContactList';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

it('renders Navbar page without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <ContactList />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
