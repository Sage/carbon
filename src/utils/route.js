import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

var Route = function(routes) {
  let history = createBrowserHistory();

  ReactDOM.render((
    <Router history={ history }>
      { routes }
    </Router>
  ), document.getElementById('app'));
};

export default Route;
