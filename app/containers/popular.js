import React from 'react';
import TitleItem from '../components/titleItem.js';


class Popular extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      popularData : []
    }
    this.callPopular = this.callPopular.bind(this);
  }

  callPopular(url){
      fetch(url)
      .then((response) => {return response.json()})
      .then((responseJson) => {this.setState({popularData: responseJson.results})})
      .catch((err) => {console.log(err)});
  }
  render(){
    this.callPopular("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=372f0200f82160d08d565e5a32b002cf");
    return (
      <div className="popular">
         <h2 style={{textAlign:'center'}}>Most Popular Movies Right Now..!</h2>
          <div className="titles">
            {this.state.popularData !== undefined ? this.state.popularData.map((each, i) => {
              let imgSRC = '';
              each.backdrop_path === null ? imgSRC = Fallback_Image : imgSRC = "http://image.tmdb.org/t/p/original/" + each.backdrop_path;
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
            }) : null}
          </div>
        </div>
    );
  }
}
export default Popular;
