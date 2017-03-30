var React = require('react');
var ReactDOM = require('react-dom');
var Header = require('./header.js');
var TitleList = require('./titlelist.js');

var App  = React.createClass({
  render(){
    return (
      <div className="main">
        <Header />
        <TitleList />
      </div>
    );
  }
});

module.exports = App;
