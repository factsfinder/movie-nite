var React = require('react');
var ReactDOM = require('react-dom');
var TitleList = require('./titlelist.js');


var Search = React.createClass({
  getInitialState(){
    return {
      query: '',
      url: '',
      data: [],
      mounted: false
    }
  },

  componentDidMount(){
    fetch("https://facebook.github.io/react-native/movies.json")
      .then((response) => {
        return response.json();
      })
      .then(responseJson => {
        console.log(responseJson);
        this.setState({
          mounted: true,
          data: responseJson
        });
      })
      .catch((err) => {
        console.error(err);
      });
  },


  handleChange(e){
    this.setState({
      query: e.target.value
    });
    e.preventDefault();
  },
  pressEnter(e){
    this.setState({
      query: e.target.value
    });
  },


  render(){
    return (
      <div className="search-form">
        <input type="text" value={this.state.query} onKeyUp={this.pressEnter} onChange={this.handleChange} placeholder="Search Movies, T.V Shows"/>
      </div>
    );
  }

});

module.exports = Search;
