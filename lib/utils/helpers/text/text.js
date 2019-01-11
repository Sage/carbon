'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _browser = require('../browser');

var _browser2 = _interopRequireDefault(_browser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Text utility methods
 *
 */
var Text = {
  /**
   * Clears any selected text from the current page
   */
  clearSelection: function clearSelection() {
    var document = _browser2.default.getDocument();
    var window = _browser2.default.getWindow();

    if (document.body.createTextRange) {
      // IE
      var range = document.body.createTextRange();
      range.collapse();
      range.select();
    } else {
      // Chrome, Firefox, Safari, Edge
      window.getSelection().removeAllRanges();
    }
  }
};

exports.default = Text;