import React, { Component } from 'react';
import ScrollAnimation from 'react-animate-on-scroll';

class ThisWebsite extends Component {

  render() {
    return (
      <div>
        <div>
          <p>Okay, it doesn't look like much, but this is one of my first efforts with ReactJS.</p>
          <p>The front end of this website is written with ReactJS and Bootstrap, and tested with Jest and enzyme.</p>
          <p>It's deployed to Amazon S3.</p>
          <p>Any server side stuff, like sending emails, is done using AWS Lambda functions and the AWS API gateway. The deployment of both client and serverside is orchestrated using the <a href="https://serverless.com/">Serverless framework</a>, which is really cool. Tests also run in Travis CI on each push to github.</p>
        </div>
        <div className="imageLinks">
          <ScrollAnimation animateIn="zoomIn" offset={-10}>
            <div className="imageLinkQueue"><a href="https://github.com/dbramwell/davidbramwell"><img src="github.png" width="80" height="80" alt="View source on David Bramwell's Github"/></a></div>
          </ScrollAnimation>
          <ScrollAnimation animateIn="zoomIn" delay={500} offset={-10}>  
            <div className="imageLinkQueue"><a href="https://travis-ci.org/dbramwell/davidbramwell"><img src="travis.png" width="80" height="80" alt="View travis-ci job"/></a></div>
          </ScrollAnimation>  
        </div>
      </div>
    );
  }
}

export default ThisWebsite;