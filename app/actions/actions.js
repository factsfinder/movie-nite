
export function getMultiSearchResults(data){
  return {
    type: "GET_MULTI_SEARCH",
    info: data
  };
}

export function getMovieSearchResults(data){
  return {
    type: "GET_MOVIES_SEARCH",
    info: data
  };
}

export function getTVSearchResults(data){
  return {
    type: "GET_TV_SHOWS_SEARCH",
    info: data
  };
}


export function getMovies(data){
  return {
    type: "GET_MOVIES",
    info: data
  };
}

export function getTvShows(data){
  return {
    type: "GET_TV_SHOWS",
    info: data
  };
}
