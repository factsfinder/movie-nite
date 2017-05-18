import React from 'react';

const TitleItem = (props) => {
  return (
     <div className="item" key={props.id} style={{ backgroundImage: 'url(' + props.imgURL + ')'}}>
       <div className="overlay">
         <h2>{props.title}</h2>
         <p>{props.overview}</p>
         <p>{props.score}</p>
       </div>
       <button className="paginationBtn" onClick={props.getDetails}>Details</button>
     </div>
   );
};

export default TitleItem;
