import React, { Component } from 'react';
import { Panel, Jumbotron } from 'react-bootstrap';
import './Reviews.css';

class Reviews extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      reviews: [],
      header: "Click for recent Reviews"
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if (!this.state.open) {
      this.setState({ header: "Loading Reviews..." });
      var that = this;
      fetch('https://y2fcj270fl.execute-api.us-east-1.amazonaws.com/dev/reviews/' + this.props.package).then(function(response) {
        response.json().then(function(data) {
          that.setState({reviews: data, open: true, header: "Reviews" });
        });
      }).catch(function(error) {
        that.setState({ header: "Sorry, can't load Reviews" });
      });
    }
  }

  render() {
    return (
      <div className="reviews">
        <Panel header={this.state.header} collapsible expanded={this.state.open} onClick={this.onClick}>
        {this.state.reviews.map((review, index) => (
          <Jumbotron key={index} className="reviewTron">
            <h1>
              {[...Array(parseInt(review.comments[0].userComment.starRating, 10)).keys()].map((index) => (
                <img key={index} src="star.png" alt="A star"/>
              ))}
            </h1>
            <h2>{review.authorName}</h2>
            <p>"{review.comments[0].userComment.text}"</p>
          </Jumbotron>
        ))}
        </Panel>
      </div>
    );
  }
}

export default Reviews;
