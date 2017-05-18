const initialState = {
  moviesData: [],
  total_movies_count: 0,
  total_pages_count: 0,
};

const getMoviesReducer = (state=initialState, action) => {
  switch (action.type) {
    case "GET_MOVIES":
      let tempData = [];
      action.info.results.map((movie, i) => {
        tempData.push({
          "title": movie.title,
          "overview": movie.overview,
          "score": movie.vote_average,
          "imgSrc": "http://image.tmdb.org/t/p/original/" + movie.backdrop_path
        });
      });
      return Object.assign({}, state, {
        moviesData: tempData,
        total_movies_count: action.info.total_results,
        total_pages_count: action.info.total_pages
      });
      break;
    default:
      return state;
  }
};

export default getMoviesReducer;
