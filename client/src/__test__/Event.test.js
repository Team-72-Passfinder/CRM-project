import React from 'react';
import Event from '../pages/event/event';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

it('renders Event/id page without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Event />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
