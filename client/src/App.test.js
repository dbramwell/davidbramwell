import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow, mount } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('contains home when created', () => {
  const app = shallow(<App />);
  const home = app.find('Home');
  expect(home.length).toEqual(1);
});

it('contains about me section when created', () => {
  const app = shallow(<App />);
  const aboutMe = app.find('AboutMe');
  expect(aboutMe.length).toEqual(1);
});

it('contains imageLinks section when created', () => {
  const app = shallow(<App />);
  const imageLinks = app.find('ImageLinks');
  expect(imageLinks.length).toEqual(1);
});

it('contains header menu', () => {
  const app = shallow(<App />);
  const menu = app.find('Menu');
  expect(menu.length).toEqual(1);
});