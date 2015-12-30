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
  isTouchDevice() {
    return (('ontouchstart' in window)
         || (navigator.MaxTouchPoints > 0)
         || (navigator.msMaxTouchPoints > 0));
  }
};

export default Devices;
