import React, { Component } from 'react';
import './EmailForm.css';

class EmailForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: "Name",
        fromEmail: "Email",
        content: "Message"
      },
      valid: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      form: {[name]: value}
    });
    this.setState({valid: this.validateEmail(this.state.form.fromEmail)});
  }

  handleSubmit(event) {

    fetch('https://ru46gazxyi.execute-api.us-east-1.amazonaws.com/dev/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.form)
    }).then(function(response) {
        if(response.status !== 200) throw new Error('Something went wrong on api server!');
    });
    event.preventDefault();
  }

  validateEmail(value) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input name="name" type="text" value={this.state.form.name} onChange={this.handleInputChange}/>
        </label>
        <label>
          Email:
          <input name="fromEmail" type="text" value={this.state.form.fromEmail} onChange={this.handleInputChange}/>
        </label>
        <label>
          Message:
          <textarea name="content" value={this.state.form.content} onChange={this.handleInputChange}/>
        </label>
        <input type="submit" value="Submit" disabled={!this.state.valid} />
      </form>
    );
  }
}

export default EmailForm;