import React from 'react';
import ReactDOM from 'react-dom';
import EmailForm from './EmailForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EmailForm />, div);
});