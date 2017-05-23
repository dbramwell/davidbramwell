import React from 'react';
import ReactDOM from 'react-dom';
import Project from './Project';
import { shallow, mount } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Project />, div);
});

it('contains Jumbotron', () => {
  const app = shallow(<Project />);
  const jumbo = app.find('Jumbotron');
  expect(jumbo.length).toBe(1);
});

it('header matches name prop', () => {
  const app = shallow(<Project name="test" />);
  const header = app.find('Jumbotron > h2');
  expect(header.text()).toBe("test");
});

it('image matches image prop', () => {
  const app = shallow(<Project name="test" img="image.jpg"/>);
  const image = app.find('Jumbotron img');
  expect(image.prop('src')).toBe("image.jpg");
});

it('When name is "This Website", creates ThisWebsite child', () => {
  const app = shallow(<Project name="This Website" img="image.jpg"/>);
  const project = app.find('ThisWebsite');
  expect(project.length).toBe(1);
});

it('When name is "react-animate-on-scroll", creates ReactAnimateOnScroll child', () => {
  const app = shallow(<Project name="react-animate-on-scroll" img="image.jpg"/>);
  const project = app.find('ReactAnimateOnScroll');
  expect(project.length).toBe(1);
});

it('When name is "Bidmas Bodmas", creates BidmasBodmas child', () => {
  const app = shallow(<Project name="Bidmas Bodmas" img="image.jpg"/>);
  const project = app.find('BidmasBodmas');
  expect(project.length).toBe(1);
});

it('When name is "Beat the Builder", creates BeatTheBuilder child', () => {
  const app = shallow(<Project name="Beat the Builder" img="image.jpg"/>);
  const project = app.find('BeatTheBuilder');
  expect(project.length).toBe(1);
});

it('When created with children, children exist', () => {
  const app = shallow(<Project name="Bidmas Bodmas" img="image.jpg"><div id="myDiv"/></Project>);
  const project = app.find('#myDiv');
  expect(project.length).toBe(1);
});
