import React from 'react';
import { Route } from 'react-router';
import { startRouter } from 'utils/router';
import 'moment/locale/fr'; // For testing the date picker
import 'utils/css';
import Highcharts from 'highcharts';
import { enableMock } from './xhr-mock';
import setupI18n from './i18n/config';

import Package from './../package.json';

// Languages
import './i18n/en';
// Additional components we expose to the window
import './expose';

// Demo
import Chrome from './views/chrome';
import SubPageChrome from './views/chrome/sub-page-chrome';
import Home from './views/pages/home';
import Sandbox from './views/pages/sandbox';
import News from './views/pages/news';

import SiteMap from './site-map';

global.Carbon = {
  version: Package.version
}

global.Highcharts = Highcharts;

setupI18n();

const routes = (
  <Route>
    <Route path='/sandbox' component={ Sandbox } />

    <Route component={ Chrome }>
      <Route path='/' component={ Home } />

      <Route component={ SubPageChrome }>
        { SiteMap.generateRoutes() }
      </Route>
    </Route>
  </Route>
);

startRouter(routes);


if (module.hot) {
  module.hot.accept();
} else {
  enableMock();
}
