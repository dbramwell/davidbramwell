import React from 'react';
import ReactDOM from 'react-dom';
import ImageLinks from './ImageLinks';
import { shallow, mount } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ImageLinks />, div);
});

it('renders a imageLinksContainer', () => {
  const app = shallow(<ImageLinks />);
  const jumbo = app.find('div.imageLinksContainer');
  expect(jumbo.length).toEqual(1);
});

it('contains correct links', () => {
  const app = shallow(<ImageLinks />);
  const links = app.find('a');
  expect(links.at(0).props().href).toEqual("https://github.com/dbramwell");
  expect(links.at(1).props().href).toEqual("https://uk.linkedin.com/pub/david-bramwell/36/b21/423");
  expect(links.at(2).props().href).toEqual("https://play.google.com/store/apps/developer?id=Bramrash");
});