import React from 'react';
import App from '../App';
import ReactDOM from 'react-dom';

require('./setupTest');

it('renders Navbar page without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
