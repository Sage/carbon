import React from 'react';
import 'utils/css';
import { Route } from 'react-router';
import { startRouter } from 'utils/router';

// Languages
import './i18n/en';

import ComponentPage from './views/pages/component-page';
import ComponentStore from './stores/component';

// Demo
import Chrome from './views/chrome';
import Home from './views/pages/home';
import Colors from './views/pages/colors';
import Icons from './views/pages/icons';

let componentRoutes = [];

ComponentStore.data.forEach((definition, index) => {
  let Wrapper = props => <ComponentPage name={ definition.get('key') } />;
  componentRoutes.push(<Route key={ index } path={ `/components/${definition.get('key')}` } component={ Wrapper } />);
});

var routes = (
  <Route component={ Chrome }>
    <Route path="/" component={ Home } />
    <Route path="/colors" component={ Colors } />
    <Route path="/icons" component={ Icons } />
    { componentRoutes }
  </Route>
);

startRouter(routes);
