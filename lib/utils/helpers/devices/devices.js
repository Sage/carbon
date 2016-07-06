/*istanbul ignore next*/'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Helper methods to detect the device type.
 */
var Devices = { /*istanbul ignore next*/
  /**
   * Determines if device supports touch events.
   *
   * @method isTouchDevice
   * @param window global window object, set default so overrideable in tests.
   * @param navigator global object, set default so overrideable in tests.
   * @return {Boolean}
   */

  isTouchDevice: function isTouchDevice() {
    /*istanbul ignore next*/var win = arguments.length <= 0 || arguments[0] === undefined ? window : arguments[0];
    /*istanbul ignore next*/var nav = arguments.length <= 1 || arguments[1] === undefined ? navigator : arguments[1];


    return 'ontouchstart' in win || nav.MaxTouchPoints > 0 || nav.msMaxTouchPoints > 0;
  }
};

/*istanbul ignore next*/exports.default = Devices;