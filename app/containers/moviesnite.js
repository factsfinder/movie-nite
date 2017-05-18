import React from 'react';
import store from '../store.js';
import { connect } from 'react-redux';
import reducers from '../reducers/reducers.js';
import { getDetails } from '../actions/actions.js';
import Header from '../components/header.js';
import Search from '../components/search.js';
import TitleItem from '../components/titleItem.js';
import Pagination from '../components/pagination.js';
import Footer from '../components/footer.js';
import Fallback_Image from '../images/fallback_movie_image.jpg';


class MoviesNite extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      query: '',
      searchReqURL: '',
      showSearchResults: false,
      showPopular: true,
      searchData: [],
      popularData : [],
    };

    this._handleChange = this._handleChange.bind(this);
    this._submitSearch = this._submitSearch.bind(this);
    this.callPopular = this.callPopular.bind(this);
    this.getDetails = this.getDetails.bind(this);
  }

  _handleChange(e){
      this.setState({
        query: e.target.value
      });
  }

  _submitSearch(e){
    if(e.key === 'Enter' && this.state.query !== ''){
      let reqURL  = "https://api.themoviedb.org/3/search/movie?api_key=372f0200f82160d08d565e5a32b002cf&language=en-US&query=" + this.state.query;
      fetch(reqURL)
      .then((response) => {return response.json()})
      .then((responseJson) => {
        this.setState({
          searchReqURL: reqURL,
          showSearchResults: true,
          showPopular: false,
          searchData: responseJson.results
        });
      })
      .catch((err) => console.log(err));
     }
     e.preventDefault();
  }

  callPopular(url){
      fetch(url)
      .then((response) => {return response.json()})
      .then((responseJson) => {this.setState({popularData: responseJson.results})})
      .catch((err) => {console.log(err)});
  }

  getDetails(id){
    let url = "https://api.themoviedb.org/3/movie/" + id + "?api_key=372f0200f82160d08d565e5a32b002cf&language=en-US";
    this.props.getDetails(url);
  }

  render(){
    let popularUrl = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=372f0200f82160d08d565e5a32b002cf&page=1";
    this.callPopular(popularUrl);
    return(
      <div className="main">
        <Header />
        <Search query={this.state.query} onChange={this._handleChange} pressEnter={this._submitSearch} />
        <div className="titles">
          {
            this.state.showSearchResults && !this.state.showPopular ?
            this.state.searchData.map((each, i) => {
              let imgSRC = '';
              each.backdrop_path === null ?
              imgSRC = Fallback_Image :
              imgSRC = "https://image.tmdb.org/t/p/original/" + each.backdrop_path;
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
                <TitleItem key={i} imgURL={imgSRC} title={title} overview={overview} score={vote_avg}/>
              );
            }) :
            this.state.popularData.map((each, i) => {
              let imgSRC = '';
              each.backdrop_path === null ? imgSRC = Fallback_Image : imgSRC = "https://image.tmdb.org/t/p/original/" + each.backdrop_path;
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
            })
          }

        </div>
        <Pagination previous={this.props.previous} next={this.props.next}/>
        <Footer />
      </div>
    );
  }
}

//Added Redux for Future Improvements
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDetails(url){
      fetch(url)
      .then((res) => {return res.json();})
      .then((resJson) => {store.dispatch(getDetails(resJson))})
      .catch((err) => {console.log(err)})
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviesNite);
