import React from 'react';
import store from '../store.js';
import { connect } from 'react-redux';
import reducers from '../reducers/reducers.js';
import { getMovies, getTvShows } from '../actions/actions.js';
import Header from '../components/header.js';
import Search from '../components/search.js';
import TitleItem from '../components/titleItem.js';
import Pagination from '../components/pagination.js';
import Fallback_Image from '../images/fallback_movie_image.jpg';

class MoviesNite extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      query: '',
      searchReqURL: '',
      showSearchResults: false,
      searchData: []
    };
    this._handleChange = this._handleChange.bind(this);
    this._submitSearch = this._submitSearch.bind(this);
  }

  _handleChange(e){
      this.setState({
        query: e.target.value
      });
  }
  _submitSearch(e){
    if(e.key === 'Enter' && this.state.query !== ''){
      let reqURL  = "https://api.themoviedb.org/3/search/multi?api_key=372f0200f82160d08d565e5a32b002cf&lang=en&query=" + this.state.query;
      fetch(reqURL)
      .then((response) => {return response.json()})
      .then((responseJson) => {
        this.setState({
          searchReqURL: reqURL,
          showSearchResults: true,
          searchData: responseJson.results
        });
      })
      .catch((err) => console.log(err));
     }
     e.preventDefault();
  }

  render(){
    return(
      <div className="main">
        <Header showMovies={this.props.getMovies} showTvShows = {this.props.getTvShows} />
        <Search query={this.state.query} onChange={this._handleChange} pressEnter={this._submitSearch} />
        <div className="titles">
          {this.state.showSearchResults ?
            this.state.searchData.map((each, i) => {
              let imgSRC = '';
              each.backdrop_path === null ?
              imgSRC = Fallback_Image :
              imgSRC = "http://image.tmdb.org/t/p/original/" + each.backdrop_path;
              let overview = each.overview;
              if(overview !== undefined && overview.length > 150){
                overview = overview.substr(0,100);
              }
              else{overview = "no description or summary available";}
              let title = each.title;
              if(each.original_title === undefined){
                title = "Sorry, no title is provided."
              }

              let vote_avg = each.vote_average;
              return (
                <TitleItem key={i} imgURL={imgSRC} title={title} overview={overview} score={vote_avg} />
              );
            }) : null
          }
        </div>
        <Pagination previous={this.props.previous} next={this.props.next}/>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    movies_count: state.getMoviesReducer.total_movies_count,
    movies_page_count: state.getMoviesReducer.total_pages_count,
    tvShows_count: state.getTvShowsReducer.total_tvShows_count,
    tvShows_page_count: state.getTvShowsReducer.total_pages_count
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMovies(){
      fetch("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=372f0200f82160d08d565e5a32b002cf")
      .then((response) => { return response.json()})
      .then((responseJson) => {store.dispatch(getMovies(responseJson))})
      .catch((err) => {console.log("An Error Occured" + err)});
    },
    getTvShows(){
      fetch("https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=372f0200f82160d08d565e5a32b002cf")
      .then((response) => { return response.json()})
      .then((responseJson) => {store.dispatch(getTvShows(responseJson))})
      .catch((err) => {console.log("An Error Occured" + err)});
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviesNite);
