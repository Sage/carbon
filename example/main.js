import React from 'react';
import { Route } from 'react-router';
import { startRouter } from './../lib/utils/router';
import MainView from './src/views'

var routes = (
  <Route path="/" component={ MainView }/>
);

startRouter(routes);
