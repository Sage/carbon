import React from 'react';
import { Route } from 'react-router';
import CarbonRoute from 'utils/route';

class testView extends React.Component {

  render () {
    return(
      <div></div>
    )
  }

}

var routes = (
  <Route path="/" component={testView} />
);

CarbonRoute(routes);
