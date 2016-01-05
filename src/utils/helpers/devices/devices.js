/**
 * Helper methods to detect the device type.
 */
let Devices = {
  /**
   * Determines if device supports touch events.
   *
   * @method isTouchDevice
   * @return {Boolean}
   */
  isTouchDevice(win = window, nav = navigator) {

    return (('ontouchstart' in win)
         || (nav.MaxTouchPoints > 0)
         || (nav.msMaxTouchPoints > 0));
  }
};

export default Devices;
