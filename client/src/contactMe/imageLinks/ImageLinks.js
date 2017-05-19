import React, { Component } from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import './ImageLinks.css';

class ImageLinks extends Component {

  render() {
    return (
      <div className="imageLinksContainer">
        <div className="imageLinks">
          <ScrollAnimation animateIn="zoomIn">
            <div className="imageLinkQueue"><a href="https://github.com/dbramwell"><img src={require("./github.png")} width="80" height="80" alt="View source on David Bramwell's Github"/></a></div>
          </ScrollAnimation>
          <ScrollAnimation animateIn="zoomIn" delay={500}>
            <div className="imageLinkQueue"><a href="https://uk.linkedin.com/pub/david-bramwell/36/b21/423"><img src={require("./linkedin.png")} width="80" height="80" alt="View David Bramwell's LinkedIn profile"/></a></div>
          </ScrollAnimation>
          <ScrollAnimation animateIn="zoomIn" delay={1000}>  
            <div className="imageLinkQueue"><a href="https://play.google.com/store/apps/developer?id=Bramrash"><img src={require("./google-play.png")} width="73" height="80" alt="View source on David Bramwell's Github"/></a></div>
          </ScrollAnimation>  
        </div>
      </div>
    );
  }
}

export default ImageLinks;