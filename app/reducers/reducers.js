import { combineReducers } from 'redux';
import getMoviesReducer from './getMoviesReducer.js';
import getTvShowsReducer from './getTvShowsReducer.js';

const reducers = combineReducers({
  getMoviesReducer,
  getTvShowsReducer
});

export default reducers;
