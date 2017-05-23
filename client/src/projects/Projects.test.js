import React from 'react';
import ReactDOM from 'react-dom';
import Projects from './Projects';
import { shallow, mount } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Projects />, div);
});

it('contains Project for "this site"', () => {
  const app = shallow(<Projects />);
  const project = app.find('Project').at(0);
  expect(project.prop('name')).toEqual("This Website");
  expect(project.prop('img')).toEqual("homepage.jpg");
});

it('contains Project for react-animate-on-scroll', () => {
  const app = shallow(<Projects />);
  const project = app.find('Project').at(1);
  expect(project.prop('name')).toEqual("react-animate-on-scroll");
  expect(project.prop('img')).toEqual("react-animate-on-scroll.jpg");
});

it('contains Project for Bidmas Bodmas', () => {
  const app = shallow(<Projects />);
  const project = app.find('Project').at(2);
  expect(project.prop('name')).toEqual("Bidmas Bodmas");
  expect(project.prop('img')).toEqual("bidmas.jpg");
});

it('Project for Bidmas Bodmas contains Reviews child with package property', () => {
  const app = shallow(<Projects />);
  const project = app.find('Project').at(2);
  const reviews = project.find('Reviews');
  expect(reviews.length).toBe(1);
  expect(reviews.at(0).prop("package")).toBe("com.bramrash.bidmasBodmas");
});

it('contains Project for Beat the Builder', () => {
  const app = shallow(<Projects />);
  const project = app.find('Project').at(3);
  expect(project.prop('name')).toEqual("Beat the Builder");
  expect(project.prop('img')).toEqual("builder.jpg");
});

it('Project for Beat the Builder contains Reviews child with package property', () => {
  const app = shallow(<Projects />);
  const project = app.find('Project').at(3);
  const reviews = project.find('Reviews');
  expect(reviews.length).toBe(1);
  expect(reviews.at(0).prop("package")).toBe("com.bramrash.beatTheBuilder");
});
