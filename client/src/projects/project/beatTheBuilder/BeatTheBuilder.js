import React, { Component } from 'react';
import ScrollAnimation from 'react-animate-on-scroll';

class BeatTheBuilder extends Component {

  render() {
    return (
      <div>
        <div>
          <p>A Brick Break style game written in Java with the Android sdk.</p>
          <p>This game was written over a couple of years when I first learnt to code in Java.</p>
          <p>I wrote it completely from scratch without any framework/engine, hence it exeriences a little slowdown and it has not aged well as phones have improved.</p>
          <p>If I was to write another android game today I would use some kind of engine for the physics at least, but this project served me well in learning Java.</p>
        </div>
        <div className="imageLinks">
          <ScrollAnimation animateIn="zoomIn" offset={0}>
            <div className="imageLinkQueue"><a href="https://play.google.com/store/apps/details?id=com.bramrash.beatTheBuilder"><img src="google-play.png" width="80" height="80" alt="Google play"/></a></div>
          </ScrollAnimation> 
        </div>
      </div>
    );
  }
}

export default BeatTheBuilder;
