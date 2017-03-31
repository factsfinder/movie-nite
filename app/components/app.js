var React = require('react');
var ReactDOM = require('react-dom');
var Header = require('./header.js');
var Popular = require('./popular.js');
var TitleItem = require('./titleitem.js');
var SearchIcon = require('../images/searchicon.png');
var Fallback_Image = require('../images/fallback_movie_image.jpg');


// Search Component after the Header Component
var Search = React.createClass({
  render(){
    return (
      <div className="search-form">
        <span className="search-icon"><img src={SearchIcon}/></span>
        <input type="search" value={this.props.query} onChange={this.props.onChange} onKeyUp={this.props.pressEnter} placeholder="Search Movies, T.V Shows"/>
      </div>
    );
  }
});



var App  = React.createClass({
   // Default States of the component
  getInitialState(){
    return {
      query:'',
      url:'',
      apiResObj: {},
      moviesdata:[],
      total_pages: '',
      total_results: '',
      curr_page: '',
      curr_page_results: '',
      showSearchResults: false,
      showPopular: true
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
        this.callApi();
      }
    },

  callApi(){
    fetch(this.state.url)
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        this.setState({
          apiResObj: responseJson,
          moviesdata: responseJson.results,
          total_pages: responseJson.total_pages,
          total_results: responseJson.total_results,
          curr_page: responseJson.page,
          curr_page_results: responseJson.results.length,
        });
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
  //the query is used to create the api url and this url is set as state's url property
    _handleSubmit(e){
      if(e.key === 'Enter' && this.state.query != ''){
        var reqURL = "https://api.themoviedb.org/3/search/movie?api_key=372f0200f82160d08d565e5a32b002cf&query=" + this.state.query +"&paage=1";
        this.setState({
          url: reqURL,
          showSearchResults: true,
          showPopular: false
        });
      }
      e.preventDefault();
    },
    showPopular(){
      this.setState({
        showPopular: true,
        showSearchResults: false
      });
    },
  render(){
    if(this.state.moviesdata){
      var titles = this.state.moviesdata.map(function(movie, i){
        if(movie.backdrop_path === null){
          var imgSRC = Fallback_Image;
        }else{
            var imgSRC = "http://image.tmdb.org/t/p/original/" + movie.backdrop_path;
        }
        var overview = movie.overview;
        if(overview.length > 150){
          overview = overview.substr(0,100);
        }
        var title = movie.original_title;
        var vote_avg = movie.vote_average;
        return (
          <TitleItem key={i} imgURL={imgSRC} title={title} overview={overview} score={vote_avg} />
        );
      });
    };
    return (
      <div className="main">
        <Header showPopular={this.showPopular} />
        <Search query={this.state.query} onChange={this._handleChange} pressEnter={this._handleSubmit} />
        <div className="titles">
          {this.state.showSearchResults && titles}
          {this.state.showPopular && <Popular />}
        </div>
      </div>
    );
  }
});

module.exports = App;
