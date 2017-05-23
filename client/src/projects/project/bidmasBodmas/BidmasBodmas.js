import React, { Component } from 'react';
import ScrollAnimation from 'react-animate-on-scroll';

class BidmasBodmas extends Component {

  render() {
    return (
      <div>
        <div>
          <p>A simple android game written in React-Native.</p>
          <p>The source is safely locked away in a private bitbucket repository, I don't want anyone stealing my $0.30 a month advertising profits!</p>
          <p>Users are given progressively harder, randomly generated maths puzzles that they must solve according to the <a href="https://en.wikipedia.org/wiki/Order_of_operations">order of operations</a>. If they get the answer wrong they can choose to see an explanation as to how to solve it.</p>
          <p>The same code runs once a day via a cron job on a linux vm to post a puzzle to the Bidmas Bodmas facebook page.</p>
        </div>
        <div className="imageLinks">
          <ScrollAnimation animateIn="zoomIn" offset={0}>
            <div className="imageLinkQueue"><a href="https://www.facebook.com/bidmasBodmas"><img src="facebook.png" width="80" height="80" alt="Facebook page"/></a></div>
          </ScrollAnimation>
          <ScrollAnimation animateIn="zoomIn" offset={0} delay={500}>
            <div className="imageLinkQueue"><a href="https://play.google.com/store/apps/details?id=com.bramrash.bidmasBodmas"><img src="google-play.png" width="80" height="80" alt="Google play"/></a></div>
          </ScrollAnimation> 
        </div>
      </div>
    );
  }
}

export default BidmasBodmas;