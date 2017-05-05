import React from 'react';
import ReactDOM from 'react-dom';
import EmailForm from './EmailForm';
import { shallow, mount } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EmailForm />, div);
});

it('has correct initial state', () => {
  const form = shallow(<EmailForm />);
  expect(form.state()).toEqual({ form: { name: 'Name', fromEmail: 'Email', content: 'Message' },
      valid: false });
});

it('renders correct labels', () => {
  const form = shallow(<EmailForm />);
  const fields = form.find('label');
  expect(fields.length).toEqual(3);
  expect(fields.at(0).contains("Name1:")).toBeTruthy();
  expect(fields.at(1).contains("Email:")).toBeTruthy();
  expect(fields.at(2).contains("Message:")).toBeTruthy();
});

it('renders correct name input', () => {
  const form = shallow(<EmailForm />);
  const nameInput = form.find('label').at(0).find('input');
  expect(nameInput.prop("name")).toEqual("name");
  expect(nameInput.prop("value")).toEqual("Name");
});

it('renders correct email input', () => {
  const form = shallow(<EmailForm />);
  const nameInput = form.find('label').at(1).find('input');
  expect(nameInput.prop("name")).toEqual("fromEmail");
  expect(nameInput.prop("value")).toEqual("Email");
});

it('renders correct message input', () => {
  const form = shallow(<EmailForm />);
  const nameInput = form.find('label').at(2).find('textarea');
  expect(nameInput.prop("name")).toEqual("content");
  expect(nameInput.prop("value")).toEqual("Message");
});

it('when input of Name input field is changed, state.form.name is changed', () => {
  const form = mount(<EmailForm />);
  const nameInput = form.find('label').at(0).find('input');
  nameInput.node.value = "David";
  nameInput.simulate('change');
  expect(form.state().form.name).toEqual("David");
});

it('when input of Message textarea field is changed, state.form.content is changed', () => {
  const form = mount(<EmailForm />);
  const messageInput = form.find('label').at(2).find('textarea');
  messageInput.node.value = "This is a message";
  messageInput.simulate('change');
  expect(form.state().form.content).toEqual("This is a message");
});

it('when input of Email inut field is changed, state.form.fromEmail is changed', () => {
  const form = mount(<EmailForm />);
  const emailInput = form.find('label').at(1).find('input');
  emailInput.node.value = "test@test.com";
  emailInput.simulate('change');
  expect(form.state().form.fromEmail).toEqual("test@test.com");
});

it('when input of Email inut field is changed to invalid email, submit button is disabled', () => {
  const form = mount(<EmailForm />);
  const emailInput = form.find('label').at(1).find('input');
  emailInput.node.value = "invalid";
  emailInput.simulate('change');
  expect(form.state().valid).toEqual(false);
  expect(form.last('input').html().includes('disabled=""')).toBeTruthy();
});

it('when input of Email inut field is changed to valid email, submit button is not disabled', () => {
  const form = mount(<EmailForm />);
  const emailInput = form.find('label').at(1).find('input');
  emailInput.node.value = "test@test.com";
  emailInput.simulate('change');
  expect(form.state().valid).toEqual(true);
  form.render();
  expect(form.last('input').html().includes('disabled=""')).toBeFalsy();
});