import React, { Component } from 'react';
import ImageLinks from './imageLinks/ImageLinks';
import EmailForm from './emailForm/EmailForm';
import { Jumbotron } from 'react-bootstrap';
import './ContactMe.css';

class ContactMe extends Component {

  render() {
    return (
      <div className="contactMe">
        <Jumbotron>
          <h2>Contact Me</h2>
          <EmailForm/>
          <ImageLinks/>
        </Jumbotron>
      </div>
    );
  }
}

export default ContactMe;