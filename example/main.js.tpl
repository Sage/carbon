import React from 'react';
import { Route } from 'react-router';
import { startRouter } from 'utils/router';

class testView extends React.Component {
  render () {
    return(
      <div>test</div>
    )
  }
}

var routes = (
  <Route path="/" component={ testView } />
);

startRouter(routes);
