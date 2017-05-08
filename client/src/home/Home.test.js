import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import { shallow, mount } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Home />, div);
});

it('renders a Jumbotron', () => {
  const home = shallow(<Home />);
  const jumbo = home.find('Jumbotron');
  expect(jumbo.length).toEqual(1);
});

it('renders two p elements', () => {
  const home = mount(<Home />);
  const p = home.find('p');
  expect(p.length).toEqual(2);
});

it('content of Jumbotron is correct', () => {
  const home = mount(<Home />);
  const content = "Hi! Welcome to my website, hope you like it. I'm David Bramwell, a software developer from the UK. Have a look around and you can find out more about me.";
  const p = home.find('Jumbotron').find('p').at(0);
  expect(p.text()).toEqual(content);
});

it('header of Jumbotron is correct', () => {
  const home = mount(<Home />);
  const h = home.find('Jumbotron').find('h1');
  expect(h.text()).toEqual("David Bramwell");
});

it('contains button that links to about me section', () => {
  const home = mount(<Home />);
  const button = home.find('Jumbotron').find('Button');
  expect(button.text()).toEqual("About me");
  expect(button.props().href).toEqual("#aboutMe");
});
