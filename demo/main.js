import React from 'react';
import { Route } from 'react-router';
import { startRouter } from 'utils/router';
import 'moment/locale/fr'; // For testing the date picker
import 'utils/css';
import Highcharts from 'highcharts';
import config from './config';
import { enableMock } from './xhr-mock';
import setupI18n from './i18n/config';

// Languages
import './i18n/en';
// Additional components we expose to the window
import './expose';

// Demo
import Chrome from './views/chrome';
import SubPageChrome from './views/chrome/sub-page-chrome';
import Home from './views/pages/home';

import SiteMap from './site-map';

global.Highcharts = Highcharts;

global.imagePath = config.imagePath;

setupI18n();
enableMock();

const routes = (
  <Route component={ Chrome }>
    <Route path='/' component={ Home } />

    <Route component={ SubPageChrome }>
      { SiteMap.generateRoutes() }
    </Route>
  </Route>
);

startRouter(routes);
