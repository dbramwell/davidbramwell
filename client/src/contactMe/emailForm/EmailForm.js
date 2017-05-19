import React, { Component } from 'react';
import './EmailForm.css';
import { Form, FormGroup, Col, ControlLabel, FormControl, Button } from 'react-bootstrap';

class EmailForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      form: {name: '', fromEmail: '', content: ''},
      valid: false,
      buttonText: 'Send'
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    var form = this.state.form;
    form[name] = value;
    this.setState({form: form});
    this.setState({valid: this.isValid(form)});
  }

  handleSubmit(event) {
    var that = this;
    fetch('https://ru46gazxyi.execute-api.us-east-1.amazonaws.com/dev/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.form)
    }).then(function(response) {
        if(response.status !== 200) throw new Error('Something went wrong on api server!');
        that.setState({buttonText: "Message Sent"});
    });
    this.setState({buttonText: "Sending...", valid: false, form: {name: '', fromEmail: '', content: ''}});
    event.preventDefault();
  }

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validateName(name) {
    return name.length > 0;
  }

  validateMessage(content) {
    return content.length > 0;
  }

  isValid(form) {
    return this.validateEmail(form.fromEmail) && this.validateName(form.name) && this.validateMessage(form.content);
  }

  getValidationStateName() {
    return this.validateName(this.state.form.name) ? 'success' : 'error';
  }

  getValidationStateEmail() {
    return this.validateEmail(this.state.form.fromEmail) ? 'success' : 'error';
  }

  getValidationStateMessage() {
    return this.validateMessage(this.state.form.content) ? 'success' : 'error';
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup controlId="name" validationState={this.getValidationStateName()}>
          <Col componentClass={ControlLabel} sm={2}>
            Name
          </Col>
          <Col sm={10}>
            <FormControl name="name" type="text" placeholder="Name" value={this.state.form.name} onChange={this.handleInputChange}/>
          </Col>
        </FormGroup>
        <FormGroup controlId="email" validationState={this.getValidationStateEmail()}>
          <Col componentClass={ControlLabel} sm={2}>
            Email
          </Col>
          <Col sm={10}>
            <FormControl name="fromEmail" type="email" placeholder="Email" value={this.state.form.fromEmail} onChange={this.handleInputChange}/>
          </Col>
        </FormGroup>
        <FormGroup controlId="message" validationState={this.getValidationStateMessage()}>
          <Col componentClass={ControlLabel} sm={2}>
            Message
          </Col>
          <Col sm={10}>
            <FormControl name="content" componentClass="textarea" placeholder="Message" value={this.state.form.content} onChange={this.handleInputChange}/>
          </Col>
        </FormGroup>
        <Button bsStyle={this.state.buttonText === "Message Sent" ? "success" : "primary"} disabled={!this.state.valid} type="submit">
          {this.state.buttonText}
        </Button>
      </Form>
    );
  }
}

export default EmailForm;