import { omit, difference } from 'lodash';
/**
 * Ether
 *
 * Ether provides functional-like helper methods for Carbon specific tasks.
 * As we are dealing with stateful values (user input, browser state) Ether
 * does not provide pure functions in all cases.
 */

/**
 * Creates an acronym from a given string.
 *
 * @method acronymize
 * @param {String} str
 * @return {String}
 */
function acronymize(str) {
  return str.match(/\b\w/g).join('');
}

/**
 * Stringifies and appends content to value.
 *
 * @method append
 * @param {String} value
 * @param {String} content
 * @return {String}
 */
function append(value, content) {
  return `${value}${content}`;
}

/**
 * Sets style on element
 *
 * @method styleElement
 * @param {Object} element
 * @param {String} attribute
 * @param {Number} value
 * @return {Object} Styled Element
 */
function styleElement(element, attribute, value) {
  return element.style[attribute] = value.toString();
}

/**
 * Returns the props of the given instance filtered by
 * the static safeProps or the optional safeProps argument
 *
 * @method validProps
 * @param {Object} instance
 * @param {Array?} _safeProps
 * @return {Object} props
 */
function validProps(instance, safeProps) {
  const klass = instance.constructor;
  const unsafeProps = difference(Object.keys(klass.propTypes), safeProps || klass.safeProps || []);
  return omit(instance.props, unsafeProps);
}

/**
 * Returns string with inserted character and specified indices
 *
 * @method insertAt
 * @param {String} string
 * @param {Object} options
 * * @param {String} separator - character to insert
 * * @param {Number} interval - interval of separator
 * @return {String} result - formatted
 */
function insertAt(string, options) {
  let separator = options.separator || '-',
      insertionShift = options.interval + separator.length,
      result = string,
      maxLength = string.length + Math.floor(string.length / options.interval) - 1;

  for (let i = options.interval; i < maxLength; i += insertionShift) {
    result = result.substr(0, i) + separator + result.substr(i);
  }

  return result;
}


export {
  acronymize,
  append,
  styleElement,
  validProps,
  insertAt
};
