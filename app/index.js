
import React from 'react';
import ReactDOM from 'react-dom';
import store from './store.js';
import { Provider } from 'react-redux';
import App from './containers/app.js';
require("!style-loader!css-loader!sass-loader!./sass/styles.scss");

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('app'));
