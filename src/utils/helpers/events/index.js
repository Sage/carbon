/**
*  JavaScript Events
*
*  A collection of functions to be used with events.
*
*  E.g. The KeyPress event has different implementations accross browsers, so
*  this class contains methods to polyfill this functionality to ensure a standardised
*  implementation between browsers
*
*  @class Events
**/
class Events {

  /**
  * A method to determine if an event is of a particular type
  *
  * @method isEventType
  * @params {Event} ev A JavaScript event
  * @params {Type} type A JavaScript event type
  * @returns {Boolean}
  **/
  static isEventType = (ev, type) => {
    return ev.type == type;
  };

  /**
  * A method to determine whether a key down event was an arrow key
  *
  * @method isNavigationKeyup
  * @params {Event} ev A JavaScript event
  * @returns {Boolean}
  **/
  static isNavigationKeyup = (ev) => {
    if (!Events.isEventType(ev, "keyup")) {
      return false;
    }

    Events.isNavigationKey(ev);
  };

  /**
  * A method to determine whether a key down event was an enter key
  *
  * @method isEnterKeyup
  * @params {Event} ev A JavaScript event
  * @returns {Boolean}
  **/
  static isEnterKeyup = (ev) => {
    if (!Events.isEventType(ev, "keyup")) {
      return false;
    }

    Events.isEnterKey(ev);
  };

  /**
  * A method to determine whether a key up event is allowed or not. This
  *
  * @method isValidKeypress
  * @params {Event} ev A JavaScript event
  * @returns {Boolean}
  **/
  static isValidKeypress = (ev) => {
    if (!Events.isEventType(ev, "keyup")) {
      return false;
    }
    // 0-9 a-z
    if (ev.which >= 48 && ev.which <= 90) {
      return true;
    }
    // Numpad 0-9
    if (ev.which >= 96 && ev.which <= 111) {
      return true;
    }
    // Symbols
    if (ev.which >= 186 && ev.which <= 192) {
      return true;
    }
    // More Symbols
    if (ev.which >= 219 && ev.which <= 222) {
      return true;
    }
    // Space, Delete, Backspace
    if (ev.which === 32 || ev.which === 46 || ev.which === 8) {
      return true;
    }
    return false;
  };

  /**
  * Determines if a number key along the top of the keyboard or a number key on the
  * keypad is pressed
  *
  * @method isNumberKey
  * @params {Event} ev A JavaScript event
  * @returns {Boolean}
  **/
  static isNumberKey = (ev) => {
    return ev.which >= 48 && ev.which <= 57 || ev.which >= 96 && ev.which <= 105;
  };

  /**
  * Determines if the key pressed is a navigation key
  *
  * @method isNavigationKey
  * @params {Event} ev A JavaScript event
  * @returns {Boolean}
  **/
  static isNavigationKey = (ev) => {
    return ev.which >= 37 && ev.which <= 40;
  };

  /**
  * Determines if the key pressed is a navigation left key
  *
  * @method isLeftKey
  * @params {Event} ev A JavaScript event
  * @returns {Boolean}
  **/
  static isLeftKey = (ev) => {
    return ev.which === 37;
  };

  /**
  * Determines if the key pressed is a navigation up key
  *
  * @method isUpKey
  * @params {Event} ev A JavaScript event
  * @returns {Boolean}
  **/
  static isUpKey = (ev) => {
    return ev.which === 38;
  };

  /**
  * Determines if the key pressed is a navigation right key
  *
  * @method isRightKey
  * @params {Event} ev A JavaScript event
  * @returns {Boolean}
  **/
  static isRightKey = (ev) => {
    return ev.which === 39;
  };

  /**
  * Determines if the key pressed is a navigation down key
  *
  * @method isDownKey
  * @params {Event} ev A JavaScript event
  * @returns {Boolean}
  **/
  static isDownKey = (ev) => {
    return ev.which === 40;
  };

  /**
  * Determines if the key pressed is a meta key
  *
  * @method isMetaKey
  * @params {Event} ev A JavaScript event
  * @returns {Boolean}
  **/
  static isMetaKey = (ev) => {
    return ev.metaKey;
  };

  /**
  * Determines if the key pressed is the escape key
  *
  * @method isEscKey
  * @params {Event} ev A JavaScript event
  * @returns {Boolean}
  **/
  static isEscKey = (ev) => {
    return ev.which === 27;
  };

  /**
  * Determines if the key pressed is the enter key
  *
  * @method isEnterKey
  * @params {Event} ev A JavaScript event
  * @returns {Boolean}
  **/
  static isEnterKey = (ev) => {
    return ev.which === 13;
  };

  /**
  * Determines if the key pressed is the tab key
  *
  * @method isTabKey
  * @params {Event} ev A JavaScript event
  * @returns {Boolean}
  **/
  static isTabKey = (ev) => {
    return ev.which === 9;
  };

  /**
  * Determines if the key pressed is the backspace key
  *
  * @method isBackspaceKey
  * @params {Event} ev A JavaScript event
  * @returns {Boolean}
  **/
  static isBackspaceKey = (ev) => {
    return ev.which === 8;
  };

  /**
  * Determines if the key pressed is the delete key
  *
  * @method isDeleteKey
  * @params {Event} ev A JavaScript event
  * @returns {Boolean}
  **/
  static isDeleteKey = (ev) => {
    return ev.which === 46;
  };

  /**
  * Determines if the key pressed is the backspace or delete key
  *
  * @method isDeletingKey
  * @params {Event} ev A JavaScript event
  * @returns {Boolean}
  **/
  static isDeletingKey = (ev) => {
    return Events.isDeleteKey(ev) || Events.isBackspaceKey(ev);
  };

  /**
  * Determines if the key pressed is the shift key
  *
  * @method isShiftKey
  * @params {Event} ev A JavaScript event
  * @returns {Boolean}
  **/
  static isShiftKey = (ev) => {
    return ev.shiftKey || ev.which === 16;
  };

  /**
  * Determines if the key pressed is the space key
  *
  * @method isSpaceKey
  * @params {Event} ev A JavaScript event
  * @returns {Boolean}
  **/
  static isSpaceKey = (ev) => {
    return ev.which === 32;
  };

  /**
  * Determines if the key pressed is the period key
  *
  * @method isPeriodKey
  * @params {Event} ev A JavaScript event
  * @returns {Boolean}
  **/
  static isPeriodKey = (ev) => {
    return ev.which === 190;
  };

  /**
  * Determines if the key pressed is the comma key
  *
  * @method isCommaKey
  * @params {Event} ev A JavaScript event
  * @returns {Boolean}
  **/
  static isCommaKey = (ev) => {
    return ev.which === 188;
  };

  /**
  * Determines if the key pressed is valid for a Decimal Field
  *
  * @method isValidDecimalKey
  * @params {Event} ev A JavaScript event
  * @returns {Boolean}
  **/
  static isValidDecimalKey = (ev) => {
    return Events.isMetaKey(ev) ||
           Events.isEnterKey(ev) ||
           Events.isNavigationKey(ev) ||
           Events.isDeletingKey(ev) ||
           Events.isNumberKey(ev) ||
           Events.isPeriodKey(ev) ||
           Events.isCommaKey(ev) ||
           Events.isSpaceKey(ev);
  };
}

export default Events;
