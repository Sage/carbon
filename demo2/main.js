import React from 'react';
import 'utils/css';
import { Route } from 'react-router';
import { startRouter } from 'utils/router';

// Languages
import './i18n/en';

import Components from './views/chrome/menu/component-list';

// Demo
import Chrome from './views/chrome';
import Home from './views/pages/home';
import Colors from './views/pages/colors';
import Icons from './views/pages/icons';
import ComponentPage from './views/pages/component-page';

var routes = (
  <Route component={ Chrome }>
    <Route path="/" component={ Home } />
    <Route path="/colors" component={ Colors } />
    <Route path="/icons" component={ Icons } />
    { Components.forEach((component) => {
      console.log(`${component.href}`);
      return (<Route path={ `/components/${component.href}` } component={ ComponentPage } />);
    }) }
  </Route>
);

startRouter(routes);
