import { findIndex } from 'lodash';

export default (availableRoutes, currentLocation) => {
  let routes = availableRoutes[availableRoutes.length - 2].childRoutes,
      parts = currentLocation.pathname.split("/"),
      currentPage = parts[parts.length - 1],
      currentRouteIndex = _currentIndex(routes, currentPage),
      nextKey = _nextKey(routes, currentRouteIndex),
      prevKey = _nextKey(routes, currentRouteIndex);

  return {
    next: {
      url: _prepareUrl(currentLocation, currentPage, nextKey),
      title: nextKey
    },
    prev: {
      url: _prepareUrl(currentLocation, currentPage, prevKey),
      title: prevKey
    }
  }
}

const _currentIndex = (routes, currentPage) => {
  return findIndex(routes, (route) => {
    return route.path === currentPage;
  });
}

const _nextKey = (routes, currentRouteIndex) => {
  let nextRouteIndex = currentRouteIndex + 1;

  if (nextRouteIndex === routes.length) {
    nextRouteIndex = 0;
  }

  return routes[nextRouteIndex].path;
}

const _previousKey = (routes, currentRouteIndex) => {
  let previousRouteIndex = currentRouteIndex - 1;

  if (nextRouteIndex === -1) {
    previousRouteIndex = routes.length - 1;
  }

  return routes[previousRouteIndex].path;
}

const _prepareUrl = (currentLocation, currentPage, key) => {
  return currentLocation.pathname.replace(currentPage, key);
}
