import React from 'react';
import 'utils/css';
import { Route } from 'react-router';
import { startRouter } from 'utils/router';

// Demo
import Chrome from './views/chrome';
import Homepage from './views/pages/home';

var routes = (
  <Route component={ Chrome }>
    <Route path="/" component={ Homepage } />
  </Route>
);

startRouter(routes);
