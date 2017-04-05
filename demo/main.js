import React from 'react';
import 'utils/css';
import { Route } from 'react-router';
import { startRouter } from 'utils/router';
import { enableMock } from './xhr-mock';

// Languages
import './i18n/en';
// Additional components we expose to the window
import './expose';

// Demo
import Chrome from './views/chrome';
import SubPageChrome from './views/chrome/sub-page-chrome';
import Home from './views/pages/home';
import Test from './views/pages/test';

import SiteMap from './site-map';

import Highcharts from 'highcharts';
global.Highcharts = Highcharts;

// global.imagePath = 'https://assets.na.sageone.com/carbon/demo/latest/assets/images';
global.imagePath = '/assets/images';

enableMock();

const routes = (
  <Route component={ Chrome }>
    <Route path="/" component={ Home } />
    <Route path="/test" component={ Test } />

    <Route component={ SubPageChrome }>
      { SiteMap.generateRoutes() }
    </Route>
  </Route>
);

startRouter(routes);
