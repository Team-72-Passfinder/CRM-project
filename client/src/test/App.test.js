import { AppBar } from '@mui/material';
import { mount } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import FrontPage from '../pages/frontpage/frontpage';

require('./setupTest');
console.log(React.version);
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders Frontpage without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FrontPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders 1 <AppBar />', () => {
  const appWrapper = mount(<FrontPage />);
  expect(appWrapper.find(AppBar).length).toBe(1);
});
