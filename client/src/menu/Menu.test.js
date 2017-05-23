import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './Menu';
import { shallow, mount } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Menu />, div);
});

it('renders a Nav bar', () => {
  const menu = mount(<Menu />);
  const nav = menu.find('Navbar');
  expect(nav.length).toEqual(1);
});

it('navbar contains header with text "Home"', () => {
  const menu = mount(<Menu />);
  const navHead = menu.find('.navbar-brand');
  expect(navHead.length).toBe(1);
  expect(navHead.text()).toBe("Home");
  expect(navHead.props().href).toBe("#home");
});

it('navbar contains link with text "About me"', () => {
  const menu = mount(<Menu />);
  const firstLink = menu.find('a').at(1);
  expect(firstLink.text()).toBe("About Me");
  expect(firstLink.props().href).toBe("#aboutMe");
});

it('navbar contains link with text "Contact Me"', () => {
  const menu = mount(<Menu />);
  const secondLink = menu.find('a').at(3);
  expect(secondLink.text()).toBe("Contact Me");
  expect(secondLink.props().href).toBe("#contactMe");
});

it('navbar contains link with text "Personal Projects"', () => {
  const menu = mount(<Menu />);
  const secondLink = menu.find('a').at(2);
  expect(secondLink.text()).toBe("Personal Projects");
  expect(secondLink.props().href).toBe("#projects");
});