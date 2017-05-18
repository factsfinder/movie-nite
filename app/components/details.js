import React from 'react';

const Details = (props) => {
    return (
      <div>
        <h1>{props.title}</h1>
        <p>{props.description}</p>
      </div>
    );
};

export default Details;