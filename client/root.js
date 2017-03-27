import {hashHistory, Router} from 'react-router';
import {Provider} from 'react-redux';
import React from 'react';
import configureStore from './store';
import Routes from './routes/Route';


const store = configureStore();

const Root = () => (
  <Provider store={store}>
    <Router
      history={hashHistory} routes={Routes}
    />
  </Provider>
);

export default Root;
