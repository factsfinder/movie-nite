const initialState = {
  showsData: [],
  total_tvShows_count: 0,
  total_pages_count: 0
};

const getTvShowsReducer = (state=initialState, action) => {
  switch (action.type) {
    case "GET_TV_SHOWS":
      let tempData = [];
      action.info.results.map((show, i) => {
        tempData.push({
          "title": show.title,
          "overview": show.overview,
          "score": show.vote_average,
          "imgSrc": "http://image.tmdb.org/t/p/original/" + show.backdrop_path
        });
      });
      return Object.assign({}, state, {
        showsData: tempData,
        total_shows_count: action.info.total_results,
        total_pages_count: action.info.total_pages
      });
      break;
    default:
      return state;

  }
};

export default getTvShowsReducer;
