import React, { Component } from 'react';
import ScrollAnimation from 'react-animate-on-scroll';

class ReactAnimateOnScroll extends Component {

  render() {
    return (
      <div>
        <div>
          <p>This is a simple react module to provide animations from <a href="https://daneden.github.io/animate.css/">Animate.css</a> when users scroll through the page.</p>
          <p>I started this project as I wanted to add more functionality to the <a href="https://www.npmjs.com/package/react-scroll-effects">react-scroll-effects</a> module, however after adding functionality and tests there wasn't much of the original code left.</p>
          <p>Tests are written with karma and run in a headless chrome session. Originally I wanted to use Jest and enzyme, but it doesn't support scrolling. I then decided on karma and phantomJS but that also doesn't support scrolling, so I ended up resorting to chrome.</p>
        </div>
        <div className="imageLinks">
          <ScrollAnimation animateIn="zoomIn" offset={0}>
            <div className="imageLinkQueue"><a href="https://dbramwell.github.io/react-animate-on-scroll/"><img src="home.png" width="80" height="80" alt="Homepage"/></a></div>
          </ScrollAnimation>
          <ScrollAnimation animateIn="zoomIn" offset={0} delay={500}>
            <div className="imageLinkQueue"><a href="https://github.com/dbramwell/react-animate-on-scroll"><img src="github.png" width="80" height="80" alt="View source on David Bramwell's Github"/></a></div>
          </ScrollAnimation>
          <ScrollAnimation animateIn="zoomIn" offset={0} delay={1000}>
            <div className="imageLinkQueue"><a href="https://www.npmjs.com/package/react-animate-on-scroll"><img src="npm.png" width="80" height="80" alt="Npm"/></a></div>
          </ScrollAnimation>
          <ScrollAnimation animateIn="zoomIn" offset={0} delay={1500}>  
            <div className="imageLinkQueue"><a href="https://travis-ci.org/dbramwell/react-animate-on-scroll"><img src="travis.png" width="80" height="80" alt="View travis-ci job"/></a></div>
          </ScrollAnimation>  
        </div>
      </div>
    );
  }
}

export default ReactAnimateOnScroll;