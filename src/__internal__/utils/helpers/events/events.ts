import composedPath from "./composedPath";

/**
 * JavaScript Events
 *
 * A collection of functions to be used with events.
 *
 * E.g. The KeyPress event has different implementations accross browsers, so
 * this class contains methods to polyfill this functionality to ensure a standardised
 * implementation between browsers
 *
 */
const Events = {
  /**
   * A method to determine if an event is of a particular type
   * */
  isEventType: (ev: React.SyntheticEvent | Event, type: string): boolean => {
    return ev.type === type;
  },

  /**
   * A method to determine whether a key down event was an arrow key
   * */
  isNavigationKeyup: (ev: React.KeyboardEvent | KeyboardEvent): boolean => {
    if (!Events.isEventType(ev, "keyup")) {
      return false;
    }

    return Events.isNavigationKey(ev);
  },

  /**
   * A method to determine whether a key down event was an enter key
   * */
  isEnterKeyup: (ev: React.KeyboardEvent | KeyboardEvent): boolean => {
    if (!Events.isEventType(ev, "keyup")) {
      return false;
    }

    return Events.isEnterKey(ev);
  },

  /**
   * A method to determine whether a key up event is allowed or not.
   * */
  isValidKeypress: (ev: React.KeyboardEvent | KeyboardEvent): boolean => {
    if (!Events.isEventType(ev, "keyup")) {
      return false;
    }
    if (
      Events.isNumberKey(ev) ||
      Events.isAlphabetKey(ev) ||
      Events.isNumpadKey(ev) ||
      Events.isSymbolKey(ev) ||
      Events.isSpaceKey(ev) ||
      Events.isDeletingKey(ev) ||
      Events.isBackspaceKey(ev)
    ) {
      return true;
    }

    return false;
  },

  /**
   * Determines if a number key along the top of the keyboard or a number key on the
   * keypad is pressed
   * */
  isNumberKey: (ev: React.KeyboardEvent | KeyboardEvent): boolean => {
    const charCode = ev.key?.charCodeAt(0);
    return charCode !== undefined && charCode >= 48 && charCode <= 57;
  },

  /**
   * Determines if the key pressed is part of the numpad
   * includes symbols
   * */
  isNumpadKey: (ev: React.KeyboardEvent | KeyboardEvent): boolean => {
    return ev.which !== undefined && ev.which >= 96 && ev.which <= 111;
  },

  /**
   * Determines if the key pressed is a alphabet key
   * Case insensitive
   * */
  isAlphabetKey: (ev: React.KeyboardEvent | KeyboardEvent): boolean => {
    return ev.which !== undefined && ev.which >= 65 && ev.which <= 90;
  },

  /**
   * Determines if the key pressed is a valid symbol
   * */
  isSymbolKey: (ev: React.KeyboardEvent | KeyboardEvent): boolean => {
    return (
      ev.which !== undefined &&
      ((ev.which >= 58 && ev.which <= 64) || // : to @
        (ev.which >= 106 && ev.which <= 107) || // numpad * and +
        (ev.which >= 186 && ev.which <= 192) || // , .
        (ev.which >= 219 && ev.which <= 222))
    );
  },

  /**
   * Determines if the key pressed is a navigation key
   * */
  isNavigationKey: (ev: React.KeyboardEvent | KeyboardEvent): boolean => {
    return ev.which !== undefined && ev.which >= 37 && ev.which <= 40;
  },

  /**
   * Determines if the key pressed is a navigation left key
   * */
  isLeftKey: (ev: React.KeyboardEvent | KeyboardEvent): boolean => {
    return ev.which === 37;
  },

  /**
   * Determines if the key pressed is a navigation up key
   * */
  isUpKey: (ev: React.KeyboardEvent | KeyboardEvent): boolean => {
    return ev.which === 38;
  },

  /**
   * Determines if the key pressed is a navigation right key
   * */
  isRightKey: (ev: React.KeyboardEvent | KeyboardEvent): boolean => {
    return ev.which === 39;
  },

  /**
   * Determines if the key pressed is a navigation down key
   * */
  isDownKey: (ev: React.KeyboardEvent | KeyboardEvent): boolean => {
    return ev.which === 40;
  },

  /**
   * Determines if the key pressed is a meta key
   * */
  isMetaKey: (ev: React.KeyboardEvent | KeyboardEvent): boolean => {
    return !!ev.metaKey;
  },

  /**
   * Determines if the key pressed is the escape key
   * */
  isEscKey: (ev: React.KeyboardEvent | KeyboardEvent): boolean => {
    return ev.which === 27;
  },

  /**
   * Determines if the key pressed is the enter key
   * */
  isEnterKey: (ev: React.KeyboardEvent | KeyboardEvent): boolean => {
    return ev.which === 13;
  },

  /**
   * Determines if the key pressed is the tab key
   * */
  isTabKey: (ev: React.KeyboardEvent | KeyboardEvent): boolean => {
    return ev.which === 9;
  },

  /**
   * Determines if the key pressed is the backspace key
   * */
  isBackspaceKey: (ev: React.KeyboardEvent | KeyboardEvent): boolean => {
    return ev.key === "Backspace";
  },

  /**
   * Determines if the key pressed is the delete key
   * */
  isDeleteKey: (ev: React.KeyboardEvent | KeyboardEvent): boolean => {
    return ev.key === "Delete";
  },

  /**
   * Determines if the key pressed is the backspace or delete key
   * */
  isDeletingKey: (ev: React.KeyboardEvent | KeyboardEvent): boolean => {
    return Events.isDeleteKey(ev) || Events.isBackspaceKey(ev);
  },

  /**
   * Determines if the key pressed is the shift key
   * */
  isShiftKey: (ev: React.KeyboardEvent | KeyboardEvent): boolean => {
    return ev.shiftKey || ev.which === 16;
  },

  /**
   * Determines if the key pressed is the space key
   * */
  isSpaceKey: (ev: React.KeyboardEvent | KeyboardEvent): boolean => {
    return ev.which === 32;
  },

  /**
   * Determines if the key pressed is the space key or enter key
   * */
  isEnterOrSpaceKey: (ev: React.KeyboardEvent | KeyboardEvent): boolean => {
    return ev.which === 13 || ev.which === 32;
  },

  /**
   * Determines if the key pressed is the period key
   * */
  isPeriodKey: (ev: React.KeyboardEvent | KeyboardEvent): boolean => {
    return ev.which === 190;
  },

  /**
   * Determines if the key pressed is the comma key
   * */
  isCommaKey: (ev: React.KeyboardEvent | KeyboardEvent): boolean => {
    return ev.which === 188;
  },

  /**
   * Determines if the key pressed is the minus key
   * */
  isMinusKey: (ev: React.KeyboardEvent | KeyboardEvent): boolean => {
    return ev.key === "-" || ev.key === "Subtract";
  },

  /**
   * Determines if the key pressed is the home key
   * */
  isHomeKey: (ev: React.KeyboardEvent | KeyboardEvent): boolean => {
    return ev.which === 36;
  },

  /**
   * Determines if the key pressed is the end key
   * */
  isEndKey: (ev: React.KeyboardEvent | KeyboardEvent): boolean => {
    return ev.which === 35;
  },

  /**
   * Gets the event's path which is an array of the objects on which listeners will be invoked.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Event/composedPath
   */
  composedPath: (ev: CustomEvent): EventTarget[] => {
    return (
      (ev.detail && ev.detail.enzymeTestingTarget && composedPath(ev)) ||
      (ev.composedPath && ev.composedPath()) ||
      composedPath(ev)
    );
  },
};

export default Events;
