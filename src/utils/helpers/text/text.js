import Browser from "../browser";

/**
 * Text utility methods
 *
 */
const Text = {
  /**
   * Clears any selected text from the current page
   */
  clearSelection() {
    const document = Browser.getDocument();
    const window = Browser.getWindow();

    if (document.body.createTextRange) {
      // IE
      const range = document.body.createTextRange();
      range.collapse();
      range.select();
    } else {
      // Chrome, Firefox, Safari, Edge
      window.getSelection().removeAllRanges();
    }
  },

  /**
   * Capitalises the first letter of string paramater
   */
  titleCase(str) {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  },
};

export default Text;
