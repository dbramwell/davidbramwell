import React from 'react';
import ReactDOM from 'react-dom';
import ContactMe from './ContactMe';
import { shallow, mount } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ContactMe />, div);
});

it('contains imageLinks when created', () => {
  const app = shallow(<ContactMe />);
  const imageLinks = app.find('Jumbotron > ImageLinks');
  expect(imageLinks.length).toEqual(1);
});

it('contains email form when created', () => {
  const app = shallow(<ContactMe />);
  const imageLinks = app.find('Jumbotron > EmailForm');
  expect(imageLinks.length).toEqual(1);
});

it('contains jumbotron when created', () => {
  const app = shallow(<ContactMe />);
  const imageLinks = app.find('Jumbotron');
  expect(imageLinks.length).toEqual(1);
});

it('contains Contact Me header when created', () => {
  const app = shallow(<ContactMe />);
  const header = app.find('Jumbotron > h2');
  expect(header.length).toEqual(1);
  expect(header.text()).toBe('Contact Me');
});