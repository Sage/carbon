import React from 'react';
import Router from 'react-router';

var Route = function(routes) {
  Router.run(routes, Router.HistoryLocation, (Handler) => {
    var targetLocation = document.getElementById('component-init') || document.body;
    React.render(<Handler/>, targetLocation);
  });
};

export default Route;
