import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import './AboutMe.css';
import ScrollEffect from 'react-scroll-effects';

class AboutMe extends Component {

  render() {
    return (
      <div className="aboutMe">
        <Jumbotron>
          <h2>A software developer with a variety of previous experience in all parts of the software delivery lifecycle:</h2>
          <ScrollEffect animate="fadeIn" queueClass="queueAboutMe" queueDuration={0.5} offset={0}>
          <div className="queueAboutMe"><p>1 year</p><p className="bold">Software Developer</p><p>UBS Investment Bank - Java/Grails/Javascript</p></div>
          <div className="queueAboutMe"><p>3 years</p><p className="bold">Devops Engineer</p><p>UBS Investment Bank - Teamcity/Gradle/Nexus/RHEL/Groovy/Bash/Puppet</p></div>
          <div className="queueAboutMe"><p>1.5 years</p><p className="bold">QA Automation Engineer</p><p>Betfair - Java/Groovy/Selenium/Maven/Jenkins</p></div>
          </ScrollEffect>
        </Jumbotron>
      </div>
    );
  }
}

export default AboutMe;