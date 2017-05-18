import React from 'react';

const Header = (props) => {
  return (
    <div className="header">
       <div className="nav">
       <span className="logo"><a href=".">Movies Nite</a></span>
         <ul className="nav-items">
           <li><a href="#" onClick={props.showMovies}>Movies</a></li>
           <li><a href="#" onClick={props.showTvShows}>T.V Shows</a></li>
           <li><a href="#">About</a></li>
         </ul>
       </div>
     </div>
  );
};

export default Header;
