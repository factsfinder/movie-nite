var React = require('react');
var ReactDOM = require('react-dom');

var TitleList = React.createClass({
  getDefaultProps(){
    return {
      title:'',
      year:''
    }
  },
  render(){
    return (
      <div>
        <p>{this.props.title} => {this.props.year}</p>
      </div>
    );
  }
});

module.exports = TitleList;
