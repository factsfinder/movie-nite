var React = require('react');
var ReactDOM = require('react-dom');
var TitleItem = require('./titleitem.js');
var Fallback_Image = require('../images/fallback_movie_image.jpg');

var Popular = React.createClass({
  getInitialState(){
    return {
      apiResObj: {},
      popularData: [],
      total_pages: '',
      total_results: '',
      curr_page: '',
      curr_page_results: '',
      showPopular: true
    }
  },
  apiCall(){
    var reqURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=372f0200f82160d08d565e5a32b002cf&page=1";
    fetch(reqURL)
    .then((res) => {
      return res.json();
    })
    .then((responseJson) => {
      this.setState({
        apiResObj: responseJson,
        popularData: responseJson.results,
        total_pages: responseJson.total_pages,
        total_results: responseJson.total_results,
        curr_page: responseJson.page,
        curr_page_results: responseJson.results.length,
        showPopular: false
      });
    })
    .catch((err)=>{
      console.error(err);
    });
  },
  render(){
    if(this.state.showPopular){
          this.apiCall();
    }
    if(this.state.popularData){
      var titles = this.state.popularData.map(function(movie, i){
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
          <TitleItem key={i} imgURL={imgSRC} overview={overview} title={title} score={vote_avg} />
        );
      });
    };
    return (
      <div className="popular">
       <h2 style={{textAlign:'center'}}>Most Popular Movies Right Now..!</h2>
        <div className="titles">
          {titles}
        </div>
      </div>
    );
  }
});

module.exports = Popular;
