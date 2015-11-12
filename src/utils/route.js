import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

export function startRouter(routes, target = document.getElementById('app')) {
  let history = createBrowserHistory();

  ReactDOM.render((
    <Router history={ history }>
      { routes }
    </Router>
  ), target);
};
