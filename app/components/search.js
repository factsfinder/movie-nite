var React = require('react');
var ReactDOM = require('react-dom');
var TitleList = require('./titlelist.js');
var SearchIcon = require('../images/searchicon.png');


var Search = React.createClass({
  getInitialState(){
    return {
      query: '',
      url: '',
      data: [],
    }
  },

//component Will Update, if the next state url and present state url are not equal and also
// if the next state url is not empty
  componentWillUpdate(nextProps, nextState){
    if(nextState.url != this.state.url && nextState.url != ''){
      return true;
    }else{
      return false;
    }
  },

//if the value of the previous query and present query are not equal and,
// present query is not empty then load the api.
  componentDidUpdate(prevProps, prevState){
    if(this.state.url !== prevState.url && this.state.url != '' ){
      console.log("Api Call URL: " + this.state.url);
      this.searchApi();
    }
  },

searchApi(){
  fetch(this.state.url)
    .then((response) => {
      return response.json();
    })
    .then((responseJson) => {
      this.setState({
        data: responseJson.results
      });
      console.log(this.state.data);
      })
    .catch((err)=>{
      console.error(err);
    });
},

  _handleChange(e){
      this.setState({
        query: e.target.value
      });
  },

// After entering a query and pressing enter,
//the query is used to form the api url and this url is set as state's url property
  _pressEnter(e){
    if(e.key === 'Enter' && this.state.query != ''){
      var reqURL = "https://api.themoviedb.org/3/search/movie?api_key=372f0200f82160d08d565e5a32b002cf&query=" + this.state.query;
      this.setState({
        url: reqURL
      });
    }
    e.preventDefault();
  },


  render(){
    return (
      <div className="search-form">
        <span className="search-icon"><img src={SearchIcon}/></span>
        <input type="search" value={this.state.query} onChange={this._handleChange} onKeyUp={this._pressEnter} placeholder="Search Movies, T.V Shows"/>
      </div>
    );
  }

});

module.exports = Search;
