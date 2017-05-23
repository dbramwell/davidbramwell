import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import './Project.css';
import ThisWebsite from './thisWebsite/ThisWebsite';
import BidmasBodmas from './bidmasBodmas/BidmasBodmas';
import BeatTheBuilder from './beatTheBuilder/BeatTheBuilder';
import ReactAnimateOnScroll from './reactAnimateOnScroll/ReactAnimateOnScroll';

class Project extends Component {

  getContent() {
    switch (this.props.name) {
      case "This Website":
        return <ThisWebsite/>
      case "react-animate-on-scroll":
        return <ReactAnimateOnScroll/>
      case "Beat the Builder":
        return <BeatTheBuilder/>
      default:
        return <BidmasBodmas/>
    }
  }

  render() {
    return (
      <div className="project">
	      <Jumbotron className="project">
	        <h2>{this.props.name}</h2>
          <img className="projectImage" src={this.props.img} alt={this.props.name}/>
          {this.getContent()}
          {this.props.children}
	      </Jumbotron>
      </div>
    );
  }
}

export default Project;
