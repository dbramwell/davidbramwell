import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import ScrollEffect from 'react-scroll-effects';
import './ImageLinks.css';

class ImageLinks extends Component {

  render() {
    return (
      <div className="imageLinksContainer">
      <Jumbotron>
        <ScrollEffect animate="zoomIn" queueClass="imageLinkQueue" queueDuration={0.5}>
        <div className="imageLinks">
          <div className="imageLinkQueue"><a href="https://github.com/dbramwell"><img src={require("./github.png")} width="80" height="80" alt="View source on David Bramwell's Github"/></a></div>
          <div className="imageLinkQueue"><a href="https://uk.linkedin.com/pub/david-bramwell/36/b21/423"><img src={require("./linkedin.png")} width="80" height="80" alt="View David Bramwell's LinkedIn profile"/></a></div>
          <div className="imageLinkQueue"><a href="https://play.google.com/store/apps/developer?id=Bramrash"><img src={require("./google-play.png")} width="73" height="80" alt="View source on David Bramwell's Github"/></a></div>
        </div>
        </ScrollEffect>
      </Jumbotron>
      </div>
    );
  }
}

export default ImageLinks;