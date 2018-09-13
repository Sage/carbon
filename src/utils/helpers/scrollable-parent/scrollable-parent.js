import Browser from '../browser';

/**
 * A shouldComponentUpdate helper. Run this method with your instance, nextProps and nextState
 * and it will perform a deep comparison of the properties - handling immutable objects.
 *
 * @method
 * @param {Object} element
 * @return {Object}
 */
const ScrollabePartent = {
  searchForScrollableParent(element) {
    if (!element) {
      return null;
    }
    const style = Browser.getWindow().getComputedStyle(element);
    const isElementScrollable = style && style.position !== 'absolute' &&
            /(auto|scroll)/.test(style.overflow + style.overflowY + style.overflowX);
    if (isElementScrollable) {
      return element;
    }
    return this.searchForScrollableParent(element.parentElement);
  }
};
export default ScrollabePartent;
