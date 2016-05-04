import React from 'react';
import { Route } from 'react-router';
import { startRouter } from 'utils/router';
import Chrome from './views/chrome';
import Homepage from './views/homepage';
import Actions from './views/actions';
import Forms from './views/forms';
import Grids from './views/grids';
import Charts from './views/charts';
import Notifications from './views/notifications';
import Modals from './views/modals';
import Layout from './views/layout';
import Misc from './views/misc';
import Design from './views/design';

var routes = (
  <Route component={ Chrome }>
    <Route path="/" component={ Homepage } />
    <Route path="/actions" component={ Actions } />
    <Route path="/forms" component={ Forms } />
    <Route path="/grids" component={ Grids } />
    <Route path="/charts" component={ Charts } />
    <Route path="/notifications" component={ Notifications } />
    <Route path="/modals" component={ Modals } />
    <Route path="/layout" component={ Layout } />
    <Route path="/design" component={ Design } />
    <Route path="/misc" component={ Misc } />
  </Route>
);

startRouter(routes);
