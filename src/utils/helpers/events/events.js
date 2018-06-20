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
const Events = {

  /**
  * A method to determine if an event is of a particular type
  *
  * @method isEventType
  * @param {Event} ev A JavaScript event
  * @param {Type} type A JavaScript event type
  * @returns {Boolean} true if event type matches passed type
  * */
  isEventType: (ev, type) => {
    return ev.type === type;
  },

  /**
  * A method to determine whether a key down event was an arrow key
  *
  * @method isNavigationKeyup
  * @param {Event} ev A JavaScript event
  * @returns {Boolean} true if key up event and a navigation key
  * */
  isNavigationKeyup: (ev) => {
    if (!Events.isEventType(ev, 'keyup')) {
      return false;
    }

    return Events.isNavigationKey(ev);
  },

  /**
  * A method to determine whether a key down event was an enter key
  *
  * @method isEnterKeyup
  * @param {Event} ev A JavaScript event
  * @returns {Boolean} true if keyup event and enter key
  * */
  isEnterKeyup: (ev) => {
    if (!Events.isEventType(ev, 'keyup')) {
      return false;
    }

    return Events.isEnterKey(ev);
  },

  /**
  * A method to determine whether a key up event is allowed or not.
  *
  * @method isValidKeypress
  * @param {Event} ev A JavaScript event
  * @returns {Boolean} true if keyup and valid
  * */
  isValidKeypress: (ev) => {
    if (!Events.isEventType(ev, 'keyup')) {
      return false;
    }
    if (Events.isNumberKey(ev) ||
        Events.isAlphabetKey(ev) ||
        Events.isNumpadKey(ev) ||
        Events.isSymbolKey(ev) ||
        Events.isSpaceKey(ev) ||
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
  * @param {Event} ev A JavaScript event
  * @returns {Boolean} true if valid number key
  * */
  isNumberKey: (ev) => {
    return (ev.which >= 48 && ev.which <= 57) || (ev.which >= 96 && ev.which <= 105);
  },

  /**
  * Determines if the key pressed is part of the numpad
  * includes symbols
  *
  * @method isNumberKey
  * @param {Event} ev A JavaScript event
  * @returns {Boolean} true if key is part of numpad
  * */
  isNumpadKey: (ev) => {
    return ev.which >= 96 && ev.which <= 111;
  },

  /**
  * Determines if the key pressed is a alphabet key
  * Case insensitive
  *
  * @method isAlphabetKey
  * @param {Event} ev A JavaScript event
  * @returns {Boolean} true if alphabet key is pressed
  * */
  isAlphabetKey: (ev) => {
    return ev.which >= 65 && ev.which <= 90;
  },

  /**
  * Determines if the key pressed is a valid symbol
  *
  * @method isSymbolKey
  * @param {Event} ev A JavaScript event
  * @returns {Boolean} true if any symbol key is pressed
  * */
  isSymbolKey: (ev) => {
    return (ev.which >= 58 && ev.which <= 64) || // : to @
           (ev.which >= 106 && ev.which <= 107) || // numpad * and +
           (ev.which >= 186 && ev.which <= 192) || // , .
           (ev.which >= 219 && ev.which <= 222); // \ ]
  },

  /**
  * Determines if the key pressed is a navigation key
  *
  * @method isNavigationKey
  * @param {Event} ev A JavaScript event
  * @returns {Boolean} true if one of four arrow keys
  * */
  isNavigationKey: (ev) => {
    return ev.which >= 37 && ev.which <= 40;
  },

  /**
  * Determines if the key pressed is a navigation left key
  *
  * @method isLeftKey
  * @param {Event} ev A JavaScript event
  * @returns {Boolean} true if left arrow key
  * */
  isLeftKey: (ev) => {
    return ev.which === 37;
  },

  /**
  * Determines if the key pressed is a navigation up key
  *
  * @method isUpKey
  * @param {Event} ev A JavaScript event
  * @returns {Boolean} true if up arrow key
  * */
  isUpKey: (ev) => {
    return ev.which === 38;
  },

  /**
  * Determines if the key pressed is a navigation right key
  *
  * @method isRightKey
  * @param {Event} ev A JavaScript event
  * @returns {Boolean} true if right arrow key
  * */
  isRightKey: (ev) => {
    return ev.which === 39;
  },

  /**
  * Determines if the key pressed is a navigation down key
  *
  * @method isDownKey
  * @param {Event} ev A JavaScript event
  * @returns {Boolean} true if down arrow key
  * */
  isDownKey: (ev) => {
    return ev.which === 40;
  },

  /**
  * Determines if the key pressed is a meta key
  *
  * @method isMetaKey
  * @param {Event} ev A JavaScript event
  * @returns {Boolean} true if any meta key is pressed
  * */
  isMetaKey: (ev) => {
    return ev.metaKey;
  },

  /**
  * Determines if the key pressed is the escape key
  *
  * @method isEscKey
  * @param {Event} ev A JavaScript event
  * @returns {Boolean} true if esc key
  * */
  isEscKey: (ev) => {
    return ev.which === 27;
  },

  /**
  * Determines if the key pressed is the enter key
  *
  * @method isEnterKey
  * @param {Event} ev A JavaScript event
  * @returns {Boolean} true if enter key
  * */
  isEnterKey: (ev) => {
    return ev.which === 13;
  },

  /**
  * Determines if the key pressed is the tab key
  *
  * @method isTabKey
  * @param {Event} ev A JavaScript event
  * @returns {Boolean} true if tab key
  * */
  isTabKey: (ev) => {
    return ev.which === 9;
  },

  /**
  * Determines if the key pressed is the backspace key
  *
  * @method isBackspaceKey
  * @param {Event} ev A JavaScript event
  * @returns {Boolean} true if backspace key
  * */
  isBackspaceKey: (ev) => {
    return ev.which === 8;
  },

  /**
  * Determines if the key pressed is the delete key
  *
  * @method isDeleteKey
  * @param {Event} ev A JavaScript event
  * @returns {Boolean} true if delete key
  * */
  isDeleteKey: (ev) => {
    return ev.which === 46;
  },

  /**
  * Determines if the key pressed is the backspace or delete key
  *
  * @method isDeletingKey
  * @param {Event} ev A JavaScript event
  * @returns {Boolean} true if is delete key or backspace key
  * */
  isDeletingKey: (ev) => {
    return Events.isDeleteKey(ev) || Events.isBackspaceKey(ev);
  },

  /**
  * Determines if the key pressed is the shift key
  *
  * @method isShiftKey
  * @param {Event} ev A JavaScript event
  * @returns {Boolean} true if shift key
  * */
  isShiftKey: (ev) => {
    return ev.shiftKey || ev.which === 16;
  },

  /**
  * Determines if the key pressed is the space key
  *
  * @method isSpaceKey
  * @param {Event} ev A JavaScript event
  * @returns {Boolean} true if space key
  * */
  isSpaceKey: (ev) => {
    return ev.which === 32;
  },

  /**
  * Determines if the key pressed is the period key
  *
  * @method isPeriodKey
  * @param {Event} ev A JavaScript event
  * @returns {Boolean} true if period key
  * */
  isPeriodKey: (ev) => {
    return ev.which === 190;
  },

  /**
  * Determines if the key pressed is the comma key
  *
  * @method isCommaKey
  * @param {Event} ev A JavaScript event
  * @returns {Boolean} true if comma key
  * */
  isCommaKey: (ev) => {
    return ev.which === 188;
  },

  /**
  * Determines if the key pressed is the minus key
  *
  * @method isMinusKey
  * @param {Event} ev A JavaScript event
  * @returns {Boolean} true if minus key
  * */
  isMinusKey: (ev) => {
    return ev.which === 189;
  }
};

export default Events;
