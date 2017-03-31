var React = require('react');
var ReactDOM = require('react-dom');
var Fallback_Image = require('../images/fallback_movie_image.jpg');


var TitleItem = React.createClass({
  render(){
    return (
      <div className="item" key={this.props.id} style={{ backgroundImage: 'url(' + this.props.imgURL + ')'}}>
        <div className="overlay">
          <h2>{this.props.title}</h2>
          <p>{this.props.overview}</p>
          <p>{this.props.score}</p>
        </div>
      </div>
    );
  }
});

module.exports = TitleItem;
