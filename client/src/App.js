import React, { Component } from 'react';
import './App.css';
import Home from './home/Home';
import Menu from './menu/Menu';
import AboutMe from './aboutMe/AboutMe';
import ContactMe from './contactMe/ContactMe';
import ScrollableAnchor, { configureAnchors } from 'react-scrollable-anchor';
import Projects from './projects/Projects';

configureAnchors({offset: -50});

class App extends Component {

  render() {
    return (
      <div>
        <div id="menu">
          <Menu/>
        </div>
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
        <ScrollableAnchor id={'projects'}>
          <div className="page">
            <Projects/>
          </div>
        </ScrollableAnchor>
        <ScrollableAnchor id={'contactMe'}>
          <div className="page">
            <ContactMe/>
          </div>
        </ScrollableAnchor>
      </div>
    );
  }
}

export default App;