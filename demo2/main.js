import React from 'react';
import 'utils/css';
import { Route } from 'react-router';
import { startRouter } from 'utils/router';

// Demo
import Chrome from './views/chrome';
import Home from './views/pages/home';
import Colors from './views/pages/colors';

var routes = (
  <Route component={ Chrome }>
    <Route path="/" component={ Home } />
    <Route path="/colors" component={ Colors } />
  </Route>
);

startRouter(routes);
