import Browser from '../browser';

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

    if (document.body.createTextRange) { // IE
      const range = document.body.createTextRange();
      range.collapse();
      range.select();
    } else { // Chrome, Firefox, Safari, Edge
      window.getSelection().removeAllRanges();
    }
  }
};

export default Text;
