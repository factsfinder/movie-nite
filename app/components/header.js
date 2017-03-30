var React = require('react');
var ReactDOM = require('react-dom');
var Search = require('./search.js');

var Nav  = React.createClass({
  render(){
    return (
      <div className="nav">
       <span className="logo">Movie Nite</span>
        <ul className="nav-items">
          <li><a href="#">Movies</a></li>
          <li><a href="#">T.V Shows</a></li>
          <li><a href="#">Popular</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
    );
  }
});

var Header = React.createClass({
  render(){
    return (
      <div className="header">
        <Nav />
        <Search />
      </div>
    );
  }
});

module.exports = Header;
