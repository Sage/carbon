import Definitions from './../../../../definitions';

const definitionKeys = Object.keys(Definitions).sort();

export default (definition) => {
  let currentIndex = _currentIndex(definition),
      nextKey = _nextKey(currentIndex),
      prevKey = _previousKey(currentIndex);

  return {
    next: {
      url: _prepareUrl(nextKey),
      title: nextKey
    },
    prev: {
      url: _prepareUrl(prevKey),
      title: prevKey
    }
  };
}

/**
 * gets the component array position for populating next and previous
 *
 * @private
 * @method _currentIndex
 * @param {Object} definition
 * @return {Number} position of the component in the array
 */
const _currentIndex = (def) => {
  return definitionKeys.indexOf(def.get('key'));
}

/**
 * cyclically retrieves next component
 *
 * @private
 * @method _nextKey
 * @param {Number} current - current position
 * @return {String}
 */
const _nextKey = (current) => {
  let pos = (current + 1) % definitionKeys.length;

  return Definitions[definitionKeys[pos]].key;
}

/**
 * cyclically retrieves previous component
 *
 * @private
 * @method _previousKey
 * @param {Number} current - current position
 * @return {String}
 */
const _previousKey = (current) => {
  let pos = (current === 0) ? definitionKeys.length - 1 : current - 1;

  return Definitions[definitionKeys[pos]].key;
}

/**
 * Prepares the url
 *
 * @private
 * @method _prepareUrl
 * @param {String} key
 * @return {String}
 */
const _prepareUrl = (key) => {
  return `/components/${key}`;
}
