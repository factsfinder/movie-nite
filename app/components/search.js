import React from 'react';
import searchIcon from '../images/searchicon.png';

const Search = (props) => {
  return (
    <div className="search-form">
       <span className="search-icon"><img src={searchIcon}/></span>
       <input type="search" value={props.query} onChange={props.onChange} onKeyUp={props.pressEnter} placeholder="Search Movies, T.V Shows, Celebrities and more..!"/>
     </div>
  );
}

export default Search;
