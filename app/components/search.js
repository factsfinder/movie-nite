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

  //Api Call
  loadApi(){
      console.log(this.state.url);
      fetch(this.state.url)
        .then((response) => {
          return response.json();
        })
        .then((responseJson) => {
          console.log(responseJson);
          this.setState({
            mounted: true,
            data: responseJson
          });
        })
        .catch((err)=>{
          console.error(err);
        });
  },

  componentDidMount(){
    this.setState({mounted: true});
  },

  componentWillUpdate(nextProps, nextState){
    if(nextState.url != this.state.url && nextState.url != ''){
      return true;
    }else{
      return false;
    }
  },
  componentDidUpdate(){
    if(this.state.url !== ''){
        this.loadApi();
    }
  },

  _handleChange(e){
      this.setState({
        query: e.target.value
      });
  },
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
        <input type="search" value={this.state.query} onChange={this._handleChange} onKeyUp={this._pressEnter} placeholder="Search Movies, T.V Shows"/>
      </div>
    );
  }

});

module.exports = Search;
