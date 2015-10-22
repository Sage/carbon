import React from 'react';
import { Route } from 'react-router';
import CarbonRoute from 'utils/route';

import UIDate from 'components/date';
import Dropdown from 'components/dropdown-suggest';

class testView extends React.Component {

  render () {
    return(
      <div>
        <UIDate name="foo" defaultValue="2012-12-21" />
        <Dropdown name="foo" defaultValue="2012-12-21" />
      </div>
    )
  }

}

var routes = (
  <Route path="/" component={testView} />
);

CarbonRoute(routes);
