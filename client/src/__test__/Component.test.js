import React from 'react';
import Navbar from '../components/Navbar';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

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
