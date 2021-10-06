import React from 'react';
import ReactDOM from 'react-dom';
import Login from '../pages/login/login';

require('./setupTest');

it('renders Login without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Login />, div);
  ReactDOM.unmountComponentAtNode(div);
});
