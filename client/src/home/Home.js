import React, { Component } from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import ScrollAnimation from 'react-animate-on-scroll';
import './Home.css';

class Home extends Component {

  render() {
    return (
      <div className="home" >
        <ScrollAnimation animateIn="fadeIn" animateOut="fadeOut">
	        <Jumbotron>
	          <h1>David Bramwell</h1>
	          <p>Hi! Welcome to my website, hope you like it. I'm David Bramwell, a software developer from the UK. Have a look around and you can find out more about me.</p>
	          <p><Button bsStyle="primary" bsSize="large" href="#aboutMe">About me</Button></p>
	        </Jumbotron>
	    </ScrollAnimation>
      </div>
    );
  }
}

export default Home;