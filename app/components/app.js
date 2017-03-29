var React = require('react');
var ReactDOM = require('react-dom');
var Header = require('./header.js');

var App  = React.createClass({
  render(){
    return (
      <div className="main">
        <Header />
      </div>
    );
  }
});

module.exports = App;
