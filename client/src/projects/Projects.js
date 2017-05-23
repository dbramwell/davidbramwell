import React, { Component } from 'react';
import Project from './project/Project';
import './Projects.css';
import Reviews from './project/googlePlayReviews/Reviews';

class Projects extends Component {

  render() {
    return (
      <div className="projects">
        <Project name="This Website" img="homepage.jpg"/>
        <Project name="react-animate-on-scroll" img="react-animate-on-scroll.jpg"/>
        <Project name="Bidmas Bodmas" img="bidmas.jpg">
          <Reviews package="com.bramrash.bidmasBodmas"/>
        </Project>
        <Project name="Beat the Builder" img="builder.jpg">
          <Reviews package="com.bramrash.beatTheBuilder"/>
        </Project>
      </div>
    );
  }
}

export default Projects;
