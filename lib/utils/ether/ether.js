'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validProps = exports.styleElement = exports.append = exports.acronymize = undefined;

var _lodash = require('lodash');

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
  return '' + value + content;
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
  var klass = instance.constructor;
  var unsafeProps = (0, _lodash.difference)(Object.keys(klass.propTypes), safeProps || klass.safeProps || []);
  return (0, _lodash.omit)(instance.props, unsafeProps);
}

exports.acronymize = acronymize;
exports.append = append;
exports.styleElement = styleElement;
exports.validProps = validProps;