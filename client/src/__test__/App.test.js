import { mount } from 'enzyme';
import React from 'react';
import App from '../App';

require('./setupTest');

it('renders without crashing', () => {
  mount(<App />);
});
