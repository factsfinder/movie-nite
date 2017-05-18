const getDetailsReducer = (state={}, action) => {
  switch (action.type) {
    case "GET_DETAILS":
      let movie = action.info;
      return Object.assign({}, state, {
        "title": movie.original_title,
        "tagline" : movie.tagline,
        "date" : movie.release_date,
        "overview": movie.overview,
        "vote_avg" : movie.vote_average,
        "imgSRC" : movie.backdrop_path
      } );
      break;
    default:
      return state;
  }
};

export default getDetailsReducer;
