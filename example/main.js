import React from 'react';
import { Route } from 'react-router';
import { startRouter } from 'utils/router';
import Dummy from './views/dummy';

var routes = (
  <Route path="/" component={ Dummy } />
);

startRouter(routes);
