import { AppBar, Typography } from '@mui/material';
import { mount, shallow } from 'enzyme';
import React from 'react';
import Frontpage from '../pages/frontpage/frontpage';
import TestRenderer from 'react-test-renderer';

require('./setupTest');

it('renders Frontpage without crashing', () => {
  mount(<Frontpage />);
});

const testRenderer = TestRenderer.create(<Frontpage />);
const pageToJSON = testRenderer.toJSON();

describe('Test overall structure of Frontpage', () => {
  it('Has 1 header, 3 div and 1 footer', () => {
    expect(pageToJSON.children.length).toBe(5);
    expect(pageToJSON.children[0].type).toBe('header');
    expect(pageToJSON.children[1].type).toBe('div');
    expect(pageToJSON.children[2].type).toBe('div');
    expect(pageToJSON.children[3].type).toBe('div');
    expect(pageToJSON.children[4].type).toBe('footer');
  });
});

describe('Test it rendered important component', () => {
  it('should render 1 <AppBar />', () => {
    const appWrapper = shallow(<Frontpage />);
    expect(appWrapper.find(AppBar).length).toBe(1);
  });
  it('should render the frontpage name', () => {
    const appWrapper = shallow(<Frontpage />);
    const titleName = <Typography variant="h6">Passfinders</Typography>;

    expect(appWrapper.contains(titleName)).toEqual(true);
  });
});
