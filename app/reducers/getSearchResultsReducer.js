const initialState = {

};

const getSearchResultsReducer = (state= initialState, action) => {
  switch(action.type){
    case "GET_MULTI_SEARCH":

    case "GET_MOVIES_SEARCH":
    case "GET_TV_SHOWS_SEARCH":
      break;
    default:
      return state;
  }
}

export default getSearchResultsReducer;
