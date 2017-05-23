import React from 'react';
import ReactDOM from 'react-dom';
import Reviews from './Reviews';
import { shallow, mount } from 'enzyme';
var nock = require('nock');
global.fetch = require('node-fetch');
var mockReviews = [
  {
    "authorName":"Test",
    "comments":[
      {
        "userComment":{
          "text":"Test comment",
          "lastModified":{
            "seconds":"1495094329",
            "nanos":617000000
          },
          "starRating":5
        }
      }
    ]
  }
];

it('renders without crashing', () => {
  var div = document.createElement('div');
  ReactDOM.render(<Reviews />, div);
});

it('contains Panel for reviews', () => {
  var app = shallow(<Reviews />);
  var panel = app.find('Panel');
  expect(panel.prop('header')).toEqual("Click for recent Reviews");
});

it('Panel is initially closed', () => {
  var app = shallow(<Reviews />);
  var panel = app.find('Panel');
  expect(app.state().open).toBeFalsy();
  expect(panel.prop('expanded')).toBeFalsy();
});

it("When response from request is an error, header changes to - Sorry, can't load reviews", (done) => {
  var app = mount(<Reviews package="com.bramrash.testPackage"/>);
  var panel = app.find('Panel');
  var endpoint = nock('https://y2fcj270fl.execute-api.us-east-1.amazonaws.com');
  endpoint.get('/dev/reviews/com.bramrash.testPackage').replyWithError("Error");
  panel.simulate('click');
  expect(endpoint.pendingMocks().length).toBe(0);
  setTimeout(function() {
    expect(panel.prop('header')).toEqual("Sorry, can't load Reviews");
    done();
  }, 10);
});

it('When panel is clicked, header changes to "Loading Reviews..."', () => {
  var app = mount(<Reviews package="com.bramrash.testPackage"/>);
  var panel = app.find('Panel');
  var endpoint = nock('https://y2fcj270fl.execute-api.us-east-1.amazonaws.com');
  endpoint.get('/dev/reviews/com.bramrash.testPackage').reply(200);
  panel.simulate('click');
  expect(panel.prop('header')).toEqual("Loading Reviews...");
});

it('When panel is clicked, request is sent to Amazon service for Reviews', () => {
  var app = mount(<Reviews package="com.bramrash.testPackage"/>);
  var panel = app.find('Panel');
  var endpoint = nock('https://y2fcj270fl.execute-api.us-east-1.amazonaws.com');
  endpoint.get('/dev/reviews/com.bramrash.testPackage').reply(200);
  expect(endpoint.pendingMocks().length).toBe(1);
  panel.simulate('click');
  expect(endpoint.pendingMocks().length).toBe(0);
});

it('When response from request is received, content is set to state.reviews', (done) => {
  var app = mount(<Reviews package="com.bramrash.testPackage"/>);
  var panel = app.find('Panel');
  var endpoint = nock('https://y2fcj270fl.execute-api.us-east-1.amazonaws.com');
  endpoint.get('/dev/reviews/com.bramrash.testPackage').reply(200, mockReviews);
  panel.simulate('click');
  expect(endpoint.pendingMocks().length).toBe(0);
  setTimeout(function() {
    expect(app.state().reviews).toEqual(mockReviews);
    done();
  }, 100);
});

it('When response from request is received, state.open is set to true', (done) => {
  var app = mount(<Reviews package="com.bramrash.testPackage"/>);
  var panel = app.find('Panel');
  var endpoint = nock('https://y2fcj270fl.execute-api.us-east-1.amazonaws.com');
  endpoint.get('/dev/reviews/com.bramrash.testPackage').reply(200, mockReviews);
  panel.simulate('click');
  expect(endpoint.pendingMocks().length).toBe(0);
  setTimeout(function() {
    expect(app.state().open).toBeTruthy();
    done();
  }, 100);
});

it('When state.reviews is populated, panel contains reviews', () => {
  var app = mount(<Reviews package="com.bramrash.testPackage"/>);
  app.setState({reviews: mockReviews});
  var reviews = app.find('Jumbotron');
  expect(reviews.length).toBe(1);
  expect(reviews.at(0).find('img').length).toBe(5);
  expect(reviews.at(0).find('h2').text()).toBe("Test");
  expect(reviews.at(0).find('p').text()).toBe("\"Test comment\"");
});

it('When state.open already true, no more responses can be received', () => {
  var app = mount(<Reviews package="com.bramrash.testPackage"/>);
  var panel = app.find('Panel');
  var endpoint = nock('https://y2fcj270fl.execute-api.us-east-1.amazonaws.com');
  app.setState({open: true});
  endpoint.get('/dev/reviews/com.bramrash.testPackage').reply(200, mockReviews);
  panel.simulate('click');
  expect(endpoint.pendingMocks().length).toBe(1);
});
