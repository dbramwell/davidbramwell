import React from 'react';
import ReactDOM from 'react-dom';
import AboutMe from './AboutMe';
import { shallow, mount } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AboutMe />, div);
});

it('renders a Jumbotron', () => {
  const app = shallow(<AboutMe />);
  const jumbo = app.find('Jumbotron');
  expect(jumbo.length).toEqual(1);
});

it('contains correct header', () => {
  const app = shallow(<AboutMe />);
  const header = app.find('Jumbotron').find('h2');
  expect(header.text()).toEqual("A software developer with a variety of previous experience in all parts of the software delivery lifecycle:");
})

it('contains correct content when created', () => {
  const app = shallow(<AboutMe />);
  const ps = app.find('Jumbotron').find('p');
  expect(ps.at(0).text()).toEqual("1 year");
  expect(ps.at(1).text()).toEqual("Software Developer");
  expect(ps.at(2).text()).toEqual("UBS Investment Bank - Java/Grails/Javascript");
  expect(ps.at(3).text()).toEqual("3 years");
  expect(ps.at(4).text()).toEqual("Devops Engineer");
  expect(ps.at(5).text()).toEqual("UBS Investment Bank - Teamcity/Gradle/Nexus/RHEL/Groovy/Bash/Puppet");
  expect(ps.at(6).text()).toEqual("1.5 years");
  expect(ps.at(7).text()).toEqual("QA Automation Engineer");
  expect(ps.at(8).text()).toEqual("Betfair - Java/Groovy/Selenium/Maven/Jenkins");
});