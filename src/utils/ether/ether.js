/**
 * Ether
 *
 * Ether provides functional-like helper methods for Carbon specific tasks.
 * As we are dealing with stateful values (user input, browser state) Ether
 * does not provide pure functions in all cases.
 *.
 */
let Ether = {

  /**
   * Sets style on element
   *
   * @method styleElement
   * @param {Object} element
   * @param {String} attribute
   * @param {Number} value
   * @return {Object} Styled Element
   */
  styleElement: (element, attribute, value) => {
    return element.style[attribute] = value.toString();
  },

  /**
   * Stringifies and appends content to value.
   *
   * @method append
   * @param {String} value
   * @param {String} content
   * @return {String}
   */
  append: (value, content) => {
    return `${value}${content}`;
  }
};

export default Ether;
