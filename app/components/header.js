var React = require('react');
var ReactDOM = require('react-dom');

var Header = React.createClass({
  render(){
    return (
      <div className="header">
        <div className="nav">
        <span className="logo"><a href=".">Movies Nite</a></span>
          <ul className="nav-items">
            <li><a href="#">Movies</a></li>
            <li><a href="#">T.V Shows</a></li>
            <li><a href="#" onClick={this.props.showPopular}>Popular</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = Header;
