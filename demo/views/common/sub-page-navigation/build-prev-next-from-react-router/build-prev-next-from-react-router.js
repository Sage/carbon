import { findIndex } from 'lodash';

export default (availableRoutes, currentLocation) => {
  let routes = availableRoutes[availableRoutes.length - 2].childRoutes,
      parts = currentLocation.pathname.split("/"),
      currentPage = parts[parts.length - 1],
      currentRouteIndex = _currentIndex(routes, currentPage),
      nextKey = _nextKey(routes, currentRouteIndex),
      prevKey = _previousKey(routes, currentRouteIndex);

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

/**
 * cyclically retrieves next component
 *
 * @private
 * @method _currentIndex
 * @param {Array} routes - the available routes
 * @param {String} currentPage
 * @return {Number}
 */
const _currentIndex = (routes, currentPage) => {
  return findIndex(routes, (route) => {
    return route.path === currentPage;
  });
}

/**
 * cyclically retrieves next component
 *
 * @private
 * @method _nextKey
 * @param {Array} routes - the available routes
 * @param {Number} current - current position
 * @return {String}
 */
const _nextKey = (routes, currentRouteIndex) => {
  let nextRouteIndex = (currentRouteIndex + 1) % routes.length
  return routes[nextRouteIndex].path;
}

/**
 * cyclically retrieves previous component
 *
 * @private
 * @method _previousKey
 * @param {Array} routes - the available routes
 * @param {Number} current - current position
 * @return {String}
 */
const _previousKey = (routes, currentRouteIndex) => {
  let previousRouteIndex = (currentRouteIndex - 1 + routes.length) % routes.length
  return routes[previousRouteIndex].path;
}

/**
 * Prepares the url
 *
 * @private
 * @method _prepareUrl
 * @param {Object} currentLocation
 * @param {String} currentPage
 * @param {String} key
 * @return {String}
 */
const _prepareUrl = (currentLocation, currentPage, key) => {
  return currentLocation.pathname.replace(currentPage, key);
}
