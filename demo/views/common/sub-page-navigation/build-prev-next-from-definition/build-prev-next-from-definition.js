import ComponentDefinitions from './../../../../definitions';
import PatternDefinitions from './../../../../pattern-definitions';

const componentDefinitionKeys = Object.keys(ComponentDefinitions).sort();
const patternDefinitionKeys = Object.keys(PatternDefinitions).sort();

export default (definition) => {
  let definitions, keys;
  if (componentDefinitionKeys.indexOf(definition) !== -1) {
    definitions = ComponentDefinitions;
    keys = componentDefinitionKeys;
  } else {
    definitions = PatternDefinitions;
    keys = patternDefinitionKeys;
  }

  if (keys.length === 1) { return null; }

  const currentIndex = _currentIndex(definition, keys),
      nextKey = _nextKey(currentIndex, keys, definitions),
      prevKey = _previousKey(currentIndex, keys, definitions);

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
};

/**
 * gets the component array position for populating next and previous
 *
 * @private
 * @method _currentIndex
 * @param {Object} definition
 * @return {Number} position of the component in the array
 */
const _currentIndex = (def, keys) => {
  return keys.indexOf(def.get('key'));
};

/**
 * cyclically retrieves next component
 *
 * @private
 * @method _nextKey
 * @param {Number} current - current position
 * @return {String}
 */
const _nextKey = (current, keys, definitions) => {
  const pos = (current + 1) % keys.length;

  return definitions[keys[pos]].key;
};

/**
 * cyclically retrieves previous component
 *
 * @private
 * @method _previousKey
 * @param {Number} current - current position
 * @return {String}
 */
const _previousKey = (current, keys, definitions) => {
  const pos = (current === 0) ? keys.length - 1 : current - 1;

  return definitions[keys[pos]].key;
};

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
};
