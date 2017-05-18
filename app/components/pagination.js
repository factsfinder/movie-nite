import React from 'react'

const Pagination = (props) => {
  return (
    <div className="pagination">
      <button className="prev paginationBtn" onClick={props.previous}>Prev</button>
      <button className="next paginationBtn" onClick={props.next}>Next</button>
    </div>
  );
};

export default Pagination;
