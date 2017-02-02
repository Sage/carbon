import React from 'react';
import 'utils/css';
import { Route } from 'react-router';
import { startRouter } from 'utils/router';

// Languages
import './i18n/en';

// Demo
import Chrome from './views/chrome';
import SubPageChrome from './views/chrome/sub-page-chrome';

import Home from './views/pages/home';
import Colors from './views/pages/style/colors';
import Icons from './views/pages/style/icons';
import Component from './views/pages/component';

var routes = (
  <Route component={ Chrome }>
    <Route path="/" component={ Home } />

    <Route component={ SubPageChrome }>
      <Route path="/style">
        <Route path="colors" component={ Colors } />
        <Route path="icons" component={ Icons } />
      </Route>

      <Route path="/components/:name" component={ Component } />
    </Route>
  </Route>
);

startRouter(routes);
