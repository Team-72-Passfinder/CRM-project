/*
https://stackoverflow.com/questions/46687271/warning-failed-prop-type-the-prop-open-is-marked-as-required-in-snackbar-but
https://www.toptal.com/react/testing-react-hooks-tutorial
*/

import React from 'react';
import Socials from '../pages/Socials';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

it('renders Navbar page without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Socials />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
