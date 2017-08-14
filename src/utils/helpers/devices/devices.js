/**
 * Helper methods to detect the device type.
 */
const Devices = {
  /**
   * Determines if device supports touch events.
   *
   * @method isTouchDevice
   * @param window global window object, set default so overrideable in tests.
   * @param navigator global object, set default so overrideable in tests.
   * @return {Boolean}
   */
  isTouchDevice(win = window, nav = navigator) {
    return (('ontouchstart' in win)
         || (nav.MaxTouchPoints > 0)
         || (nav.msMaxTouchPoints > 0));
  }
};

export default Devices;
