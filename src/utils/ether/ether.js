import { omit, difference, includes } from "lodash";

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
  if (!str) return "";
  const matches = str.match(/\b\w/g);
  if (!matches) return "";
  return matches.join("");
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
  if (element.style[attribute] !== value.toString()) {
    element.style[attribute] = value.toString();
  }

  return element.style[attribute];
}

/**
 * Returns the props that were passed to a component but excludes the props listed in propTypes
 *
 * Optionally includes the safeProps which can be defined as a static property on a Class or passed as the second
 * argument.
 *
 * @method validProps
 * @param {Object} instance
 * @param {Array?} safeProps
 * @return {Object} props
 */
function validProps(instance, safeProps) {
  const component = instance.isReactComponent ? instance.constructor : instance;
  const unsafeProps = difference(
    Object.keys(component.propTypes),
    safeProps || component.safeProps || []
  );
  return omit(instance.props, unsafeProps);
}

/**
 * Returns string with inserted character at specified indices
 *
 * @method insertAt
 * @param {String} value - value without separators
 * @param {Object} options
 * * @param {String} separator - character to insert
 * * @param {Array} insertionIndices - indices where separator will be inserted
 * @return {String} result - formatted
 */
function insertAt(value, options) {
  const separator = options.separator || "-";
  let result = value;

  for (let i = 0; i < result.length; i++) {
    if (includes(options.insertionIndices, i)) {
      result = result.substr(0, i) + separator + result.substr(i);
    }
  }

  return result;
}

export { acronymize, append, insertAt, styleElement, validProps };
