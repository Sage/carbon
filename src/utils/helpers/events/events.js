/**
* JavaScript Events
*
* A collection of functions to be used with events.
*
* E.g. The KeyPress event has different implementations accross browsers, so
* this class contains methods to polyfill this functionality to ensure a standardised
* implementation between browsers
*
* @object Events
*/
let Events = {

  /**
  * A method to determine if an event is of a particular type
  *
  * @method isEventType
  * @params {Event} ev A JavaScript event
  * @params {Type} type A JavaScript event type
  * @returns {Boolean}
  **/
  isEventType: (ev, type) => {
    return ev.type == type;
  },

  /**
  * A method to determine whether a key down event was an arrow key
  *
  * @method isNavigationKeyup
  * @params {Event} ev A JavaScript event
  * @returns {Boolean}
  **/
  isNavigationKeyup: (ev) => {
    if (!Events.isEventType(ev, "keyup")) {
      return false;
    }

    return Events.isNavigationKey(ev);
  },

  /**
  * A method to determine whether a key down event was an enter key
  *
  * @method isEnterKeyup
  * @params {Event} ev A JavaScript event
  * @returns {Boolean}
  **/
  isEnterKeyup: (ev) => {
    if (!Events.isEventType(ev, "keyup")) {
      return false;
    }

    return Events.isEnterKey(ev);
  },

  /**
  * A method to determine whether a key up event is allowed or not.
  *
  * @method isValidKeypress
  * @params {Event} ev A JavaScript event
  * @returns {Boolean}
  **/
  isValidKeypress: (ev) => {
    if (!Events.isEventType(ev, "keyup")) {
      return false;
    }
    if (Events.isNumberKey(ev)   ||
        Events.isAlphabetKey(ev) ||
        Events.isNumpadKey(ev)   ||
        Events.isSymbolKey(ev)   ||
        Events.isSpaceKey(ev)    ||
        Events.isDeletingKey(ev) ||
        Events.isBackspaceKey(ev)) {
      return true;
    }

    return false;
  },

  /**
  * Determines if a number key along the top of the keyboard or a number key on the
  * keypad is pressed
  *
  * @method isNumberKey
  * @params {Event} ev A JavaScript event
  * @returns {Boolean}
  **/
  isNumberKey: (ev) => {
    return ev.which >= 48 && ev.which <= 57 || ev.which >= 96 && ev.which <= 105;
  },

  /**
  * Determines if the key pressed is part of the numpad
  * includes symbols
  *
  * @method isNumberKey
  * @params {Event} ev A JavaScript event
  * @returns {Boolean}
  **/
  isNumpadKey: (ev) => {
    return ev.which >= 96 && ev.which <= 111;
  },

  /**
  * Determines if the key pressed is a alphabet key
  * Case insensitive
  *
  * @method isAlphabetKey
  * @params {Event} ev A JavaScript event
  * @returns {Boolean}
  **/
  isAlphabetKey: (ev) => {
    return ev.which >= 65 && ev.which <= 90;
  },

  /**
  * Determines if the key pressed is a valid symbol
  *
  * @method isSymbolKey
  * @params {Event} ev A JavaScript event
  * @returns {Boolean}
  **/
  isSymbolKey: (ev) => {
    return ev.which >= 58 && ev.which <= 64 || // : to @
           ev.which >= 106 && ev.which <= 107 || // numpad * and +
           ev.which >= 186 && ev.which <= 192 || // , .
           ev.which >= 219 && ev.which <= 222; // \ ]
  },

  /**
  * Determines if the key pressed is a navigation key
  *
  * @method isNavigationKey
  * @params {Event} ev A JavaScript event
  * @returns {Boolean}
  **/
  isNavigationKey: (ev) => {
    return ev.which >= 37 && ev.which <= 40;
  },

  /**
  * Determines if the key pressed is a navigation left key
  *
  * @method isLeftKey
  * @params {Event} ev A JavaScript event
  * @returns {Boolean}
  **/
  isLeftKey: (ev) => {
    return ev.which === 37;
  },

  /**
  * Determines if the key pressed is a navigation up key
  *
  * @method isUpKey
  * @params {Event} ev A JavaScript event
  * @returns {Boolean}
  **/
  isUpKey: (ev) => {
    return ev.which === 38;
  },

  /**
  * Determines if the key pressed is a navigation right key
  *
  * @method isRightKey
  * @params {Event} ev A JavaScript event
  * @returns {Boolean}
  **/
  isRightKey: (ev) => {
    return ev.which === 39;
  },

  /**
  * Determines if the key pressed is a navigation down key
  *
  * @method isDownKey
  * @params {Event} ev A JavaScript event
  * @returns {Boolean}
  **/
  isDownKey: (ev) => {
    return ev.which === 40;
  },

  /**
  * Determines if the key pressed is a meta key
  *
  * @method isMetaKey
  * @params {Event} ev A JavaScript event
  * @returns {Boolean}
  **/
  isMetaKey: (ev) => {
    return ev.metaKey;
  },

  /**
  * Determines if the key pressed is the escape key
  *
  * @method isEscKey
  * @params {Event} ev A JavaScript event
  * @returns {Boolean}
  **/
  isEscKey: (ev) => {
    return ev.which === 27;
  },

  /**
  * Determines if the key pressed is the enter key
  *
  * @method isEnterKey
  * @params {Event} ev A JavaScript event
  * @returns {Boolean}
  **/
  isEnterKey: (ev) => {
    return ev.which === 13;
  },

  /**
  * Determines if the key pressed is the tab key
  *
  * @method isTabKey
  * @params {Event} ev A JavaScript event
  * @returns {Boolean}
  **/
  isTabKey: (ev) => {
    return ev.which === 9;
  },

  /**
  * Determines if the key pressed is the backspace key
  *
  * @method isBackspaceKey
  * @params {Event} ev A JavaScript event
  * @returns {Boolean}
  **/
  isBackspaceKey: (ev) => {
    return ev.which === 8;
  },

  /**
  * Determines if the key pressed is the delete key
  *
  * @method isDeleteKey
  * @params {Event} ev A JavaScript event
  * @returns {Boolean}
  **/
  isDeleteKey: (ev) => {
    return ev.which === 46;
  },

  /**
  * Determines if the key pressed is the backspace or delete key
  *
  * @method isDeletingKey
  * @params {Event} ev A JavaScript event
  * @returns {Boolean}
  **/
  isDeletingKey: (ev) => {
    return Events.isDeleteKey(ev) || Events.isBackspaceKey(ev);
  },

  /**
  * Determines if the key pressed is the shift key
  *
  * @method isShiftKey
  * @params {Event} ev A JavaScript event
  * @returns {Boolean}
  **/
  isShiftKey: (ev) => {
    return ev.shiftKey || ev.which === 16;
  },

  /**
  * Determines if the key pressed is the space key
  *
  * @method isSpaceKey
  * @params {Event} ev A JavaScript event
  * @returns {Boolean}
  **/
  isSpaceKey: (ev) => {
    return ev.which === 32;
  },

  /**
  * Determines if the key pressed is the period key
  *
  * @method isPeriodKey
  * @params {Event} ev A JavaScript event
  * @returns {Boolean}
  **/
  isPeriodKey: (ev) => {
    return ev.which === 190;
  },

  /**
  * Determines if the key pressed is the comma key
  *
  * @method isCommaKey
  * @params {Event} ev A JavaScript event
  * @returns {Boolean}
  **/
  isCommaKey: (ev) => {
    return ev.which === 188;
  },

  /**
  * Determines if the key pressed is the minus key
  *
  * @method isMinusKey
  * @params {Event} ev A JavaScript event
  * @returns {Boolean}
  **/
  isMinusKey: (ev) => {
    return ev.which === 189;
  }
};

export default Events;
