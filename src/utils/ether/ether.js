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
   * Returns value as string pixel value
   *
   * @method pixelValue
   * @param {Number} value
   * @return {String}
   */
  pixelValue: (value) => {
    return `${value}px`;
  },

  /**
   * Returns value as string percent value
   *
   * @method percentValue
   * @param {Number} value
   * @return {String}
   */
  percentValue: (value) => {
    return `${value}%`;
  }
};

export default Ether;
