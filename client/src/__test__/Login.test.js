import React from 'react';
import Login from '../pages/login/login';
import { mount, shallow } from 'enzyme';
import { Button, TextField } from '@mui/material';

require('./setupTest');

it('renders Frontpage without crashing', () => {
  mount(<Login />);
});

describe('Test it rendered important component', () => {
  it('should render the login title', () => {
    const appWrapper = shallow(<Login />);
    expect(appWrapper.text()).toMatch('Login');
  });

  it('should render 2 <TextField />', () => {
    const appWrapper = shallow(<Login />);
    expect(appWrapper.find(TextField).length).toBe(2);
  });

  it('should render 1 <Button />', () => {
    const appWrapper = shallow(<Login />);
    expect(appWrapper.find(Button).length).toBe(1);
  });

  // it('renders UI correctly', () => {
  //   const tree = TestRenderer.create(<Login />).toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
});

describe('Test mocked behaviour', () => {
  it('calls onLogin when button clicked', () => {
    const mockCallback = jest.fn();

    const appWrapper = shallow(<Login onClick={mockCallback} />);

    appWrapper
      .find('#input_username')
      .simulate('change', { target: { value: 'myUser' } });
    appWrapper
      .find('#input_password')
      .simulate('change', { target: { value: 'myPassword' } });
    appWrapper
      .find('#submit_button')
      .simulate('click', { preventDefault() {} });

    expect(mockCallback).toBeCalled();
  });
});
