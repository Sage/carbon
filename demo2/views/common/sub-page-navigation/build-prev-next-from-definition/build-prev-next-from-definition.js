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
 * @method _nextComponent
 * @param {Number} current - current position
 * @return {Object} Definitions element
 */
const _nextKey = (current) => {
  let pos = (current + 1) % definitionKeys.length;

  return Definitions[definitionKeys[pos]].key;
}

/**
 * cyclically retrieves previous component
 *
 * @private
 * @method _previousComponent
 * @param {Number} current - current position
 * @return {Object} Definitions element
 */
const _previousKey = (current) => {
  let pos = current === 0
    ? definitionKeys.length - 1
    : current - 1;

  return Definitions[definitionKeys[pos]].key;
}

/**
 * prepares an object for sub navigation, using href and name keys, from a definition
 *
 * @private
 * @method _prepareSubnavObject
 * @param {Object} def - a component definition
 * @return {Object}
 */
const _prepareUrl = (key) => {
  return `/components/${key}`;
}
