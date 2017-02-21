import React from 'react';
import './xhr-mock';
import 'utils/css';
import { Route } from 'react-router';
import { startRouter } from 'utils/router';

// Languages
import './i18n/en';
// Additional components we expose to the window
import './expose';

// Demo
import Chrome from './views/chrome';
import SubPageChrome from './views/chrome/sub-page-chrome';
import Home from './views/pages/home';

import SiteMap from './site-map';

// global.imagePath = 'https://assets.na.sageone.com/carbon/demo/latest/assets/images';
global.imagePath = '/assets/images';

const routes = (
  <Route component={ Chrome }>
    <Route path="/" component={ Home } />

    <Route component={ SubPageChrome }>
      { SiteMap.generateRoutes() }
    </Route>
  </Route>
);

startRouter(routes);
