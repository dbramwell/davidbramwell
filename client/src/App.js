import React, { Component } from 'react';
import './App.css';
import Home from './home/Home';
import Menu from './menu/Menu';
import AboutMe from './aboutMe/AboutMe';
import ImageLinks from './imageLinks/ImageLinks';
import ScrollableAnchor from 'react-scrollable-anchor';

class App extends Component {


  render() {
    return (
      <div>
        <Menu/>
        <ScrollableAnchor id={'home'}>
          <div className="page">
            <Home/>
          </div>
        </ScrollableAnchor>
        <ScrollableAnchor id={'aboutMe'}>
          <div className="page">
            <AboutMe/>
          </div>
        </ScrollableAnchor>
        <ScrollableAnchor id={'externalLinks'}>
          <div className="page">
            <ImageLinks/>
          </div>
        </ScrollableAnchor>
      </div>
    );
  }
}

export default App;