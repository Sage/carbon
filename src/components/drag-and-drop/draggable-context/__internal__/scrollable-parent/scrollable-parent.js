import Browser from "../../../../../__internal__/utils/helpers/browser";

/**
 * @method
 * @param {Object} element
 * @return {Object}
 */
const ScrollablePartent = {
  searchForScrollableParent(element) {
    if (!element) {
      return null;
    }
    const style = Browser.getWindow().getComputedStyle(element);
    const isElementScrollable =
      style &&
      style.position !== "absolute" &&
      /(auto|scroll)/.test(style.overflow + style.overflowY + style.overflowX);
    if (isElementScrollable) {
      return element;
    }
    return this.searchForScrollableParent(element.parentElement);
  },
};
export default ScrollablePartent;
