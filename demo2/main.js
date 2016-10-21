import React from 'react';
import 'utils/css';
import { Route } from 'react-router';
import { startRouter } from 'utils/router';
import Chrome from './views/chrome';
import Homepage from './views/homepage';

var routes = (
  <Route component={ Chrome }>
    <Route path="/" component={ Homepage } />
  </Route>
);

startRouter(routes);
