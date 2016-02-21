import React from 'react';
import { Route } from 'react-router';
import { startRouter } from 'utils/router';
import Chrome from './views/chrome';
import Forms from './views/forms';

var routes = (
  <Route component={ Chrome }>
    <Route path="/forms" component={ Forms } />
  </Route>
);

startRouter(routes);
