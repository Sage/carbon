import React from 'react';
import { Route } from 'react-router';
import { startRouter } from 'utils/router';
import App from './views/app';
import Dummy from './views/dummy';
import InAndOut from './views/InAndOut';

var routes = (
  <Route path="/" component={ App } >
    <Route path="finances" component={ Dummy } />
    <Route path="income" component={ InAndOut } />
  </Route>
);

startRouter(routes);
