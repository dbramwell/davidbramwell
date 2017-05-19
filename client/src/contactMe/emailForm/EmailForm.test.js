import React from 'react';
import ReactDOM from 'react-dom';
import EmailForm from './EmailForm';
import { shallow, mount } from 'enzyme';
var nock = require('nock');
global.fetch = require('node-fetch');

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EmailForm />, div);
});

it('renders a Form', () => {
  const form = shallow(<EmailForm />);
  expect(form.find('Form').length).toBe(1);
});

it('contains FormGroup for Name', () => {
  const form = mount(<EmailForm />);
  const nameFormGroup = form.find('FormGroup').at(0);
  expect(nameFormGroup.find('Col').at(0).text()).toBe('Name');
});

it('contains FormGroup for Email', () => {
  const form = mount(<EmailForm />);
  const nameFormGroup = form.find('FormGroup').at(1);
  expect(nameFormGroup.find('Col').at(0).text()).toBe('Email');
});

it('contains FormGroup for Message', () => {
  const form = mount(<EmailForm />);
  const nameFormGroup = form.find('FormGroup').at(2);
  expect(nameFormGroup.find('Col').at(0).text()).toBe('Message');
});

it('has correct initial state', () => {
  const form = shallow(<EmailForm />);
  expect(form.state()).toEqual({buttonText: "Send", form: {name: '', fromEmail: '', content: ''}, valid: false });
});

it('renders name input', () => {
  const form = mount(<EmailForm />);
  const nameInput = form.find('FormControl').at(0);
  expect(nameInput.prop('placeholder')).toEqual("Name");
  expect(nameInput.prop('type')).toEqual("text");
});

it('renders correct email input', () => {
  const form = mount(<EmailForm />);
  const emailInput = form.find('FormControl').at(1);
  expect(emailInput.prop('placeholder')).toEqual("Email");
  expect(emailInput.prop('type')).toEqual("email");
});

it('renders correct message input', () => {
  const form = mount(<EmailForm />);
  const messageInput = form.find('FormControl').at(2);
  expect(messageInput.prop('placeholder')).toEqual("Message");
  expect(messageInput.prop('componentClass')).toEqual("textarea");
});

it('when input of Name input field is changed, state.form.name is changed', () => {
  const form = mount(<EmailForm />);
  setNameInput(form, true);
  expect(form.state().form.name).toEqual("A name");
});

it('when input of Message textarea field is changed, state.form.content is changed', () => {
  const form = mount(<EmailForm />);
  setMessageInput(form, true);
  expect(form.state().form.content).toEqual("A message");
});

it('when input of Email input field is changed, state.form.fromEmail is changed', () => {
  const form = mount(<EmailForm />);
  setEmailInput(form, true);
  expect(form.state().form.fromEmail).toEqual("test@test.com");
});

it('when all inputs are valid, submit is not diabled', () => {
  const form = mount(<EmailForm />);
  setValidInputs(form);
  expect(form.last('button').html().includes('disabled=""')).toBeFalsy();
})

it('when input of Email input field is changed to invalid email, submit button is disabled', () => {
  const form = mount(<EmailForm />);
  setValidInputs(form);
  expect(form.state().valid).toBeTruthy();
  expect(form.last('button').html().includes('disabled=""')).toBeFalsy();

  setEmailInput(form, false);
  expect(form.state().valid).toBeFalsy();
  expect(form.last('button').html().includes('disabled=""')).toBeTruthy();
});

it('when input of Name input field is changed to invalid name, submit button is disabled', () => {
  const form = mount(<EmailForm />);
  setValidInputs(form);
  expect(form.state().valid).toBeTruthy();
  expect(form.last('button').html().includes('disabled=""')).toBeFalsy();

  setNameInput(form, false);
  expect(form.state().valid).toBeFalsy();
  expect(form.last('button').html().includes('disabled=""')).toBeTruthy();
});

it('when message is invalid, submit button is disabled', () => {
  const form = mount(<EmailForm />);
  setValidInputs(form);
  expect(form.state().valid).toBeTruthy();
  expect(form.last('button').html().includes('disabled=""')).toBeFalsy();

  setMessageInput(form, false);
  expect(form.state().valid).toBeFalsy();
  expect(form.last('button').html().includes('disabled=""')).toBeTruthy();
});

it('when email is invalid, validationState is error', () => {
  const form = mount(<EmailForm />);
  const emailInputGroup = form.find('FormGroup').at(1);
  expect(emailInputGroup.prop('validationState')).toBe("error");
});

it('when name is invalid, validationState is error', () => {
  const form = mount(<EmailForm />);
  const nameInputGroup = form.find('FormGroup').at(0);
  expect(nameInputGroup.prop('validationState')).toBe("error");
});

it('when message is invalid, validationState is error', () => {
  const form = mount(<EmailForm />);
  const messageInputGroup = form.find('FormGroup').at(2);
  expect(messageInputGroup.prop('validationState')).toBe("error");
});

it('when email is valid, validationState is success', () => {
  const form = mount(<EmailForm />);
  setEmailInput(form, true);
  const emailInputGroup = form.find('FormGroup').at(1);
  expect(emailInputGroup.prop('validationState')).toBe("success");
});

it('when name is valid, validationState is success', () => {
  const form = mount(<EmailForm />);
  setNameInput(form, true);
  const nameInputGroup = form.find('FormGroup').at(0);
  expect(nameInputGroup.prop('validationState')).toBe("success");
});

it('when message is valid, validationState is success', () => {
  const form = mount(<EmailForm />);
  setMessageInput(form, true);
  const messageInputGroup = form.find('FormGroup').at(2);
  expect(messageInputGroup.prop('validationState')).toBe("success");
});

it('when submitting form, correct data is sent to correct endpoint and form is cleared', () => {
  var endpoint = nock('https://ru46gazxyi.execute-api.us-east-1.amazonaws.com');
  endpoint.post('/dev/email', {name: "A name", fromEmail: "test@test.com", content: "A message"})
          .reply(200);
  expect(endpoint.pendingMocks().length).toBe(1);
  const form = mount(<EmailForm />);
  setValidInputs(form);
  form.simulate('submit');
  expect(endpoint.pendingMocks().length).toBe(0);
  expect(form.state().form).toEqual({name: '', fromEmail: '', content: ''});
});

it('when message is sent, button text changes to "Sending..."', () => {
  var endpoint = nock('https://ru46gazxyi.execute-api.us-east-1.amazonaws.com');
  endpoint.post('/dev/email', {name: "A name", fromEmail: "test@test.com", content: "A message"})
          .reply(200);
  const form = mount(<EmailForm />);
  setValidInputs(form);
  form.simulate('submit');
  expect(form.find('button').text()).toBe("Sending...");
});

it('when message is sent, button text is "Message Sent" and is green', () => {
  const form = mount(<EmailForm />);
  form.setState({buttonText: "Message Sent"});
  expect(form.find('button').text()).toBe("Message Sent");
  expect(form.find('button').hasClass("btn-success")).toBeTruthy();
})

function setValue(elem, value) {
  elem.node.value = value;
  elem.simulate('change');
}

function setNameInput(form, valid) {
  const nameInput = form.find('input').at(0);
  setValue(nameInput, valid ? "A name" : "");
}

function setEmailInput(form, valid) {
  const emailInput = form.find('input').at(1);
  setValue(emailInput, valid ? "test@test.com" : "Invalid email");
}

function setMessageInput(form, valid) {
  const messageInput = form.find('textarea');
  setValue(messageInput, valid ? "A message" : "");
}

function setValidInputs(form) {
  setNameInput(form, true);
  setEmailInput(form, true);
  setMessageInput(form, true);
}