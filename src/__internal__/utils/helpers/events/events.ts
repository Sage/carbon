import React from "react";
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
   * Determines if event is a keyboard event
   */
  isKeyboardEvent: (
    ev: React.SyntheticEvent | Event,
  ): ev is React.KeyboardEvent | KeyboardEvent => {
    return ["keydown", "keypress", "keyup"].includes(ev.type);
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
   * Determines if the key pressed is a navigation left key
   * */
  isLeftKey: (ev: React.KeyboardEvent | KeyboardEvent): boolean => {
    return ev.key === "ArrowLeft";
  },

  /**
   * Determines if the key pressed is a navigation up key
   * */
  isUpKey: (ev: React.KeyboardEvent | KeyboardEvent): boolean => {
    return ev.key === "ArrowUp";
  },

  /**
   * Determines if the key pressed is a navigation right key
   * */
  isRightKey: (ev: React.KeyboardEvent | KeyboardEvent): boolean => {
    return ev.key === "ArrowRight";
  },

  /**
   * Determines if the key pressed is a navigation down key
   * */
  isDownKey: (ev: React.KeyboardEvent | KeyboardEvent): boolean => {
    return ev.key === "ArrowDown";
  },

  /**
   * Determines if the key pressed is the escape key
   * */
  isEscKey: (ev: React.KeyboardEvent | KeyboardEvent): boolean => {
    return ev.key === "Escape";
  },

  /**
   * Determines if the key pressed is the enter key
   * */
  isEnterKey: (ev: React.KeyboardEvent | KeyboardEvent): boolean => {
    return ev.key === "Enter";
  },

  /**
   * Determines if the key pressed is the tab key
   * */
  isTabKey: (ev: React.KeyboardEvent | KeyboardEvent): boolean => {
    return ev.key === "Tab";
  },

  /**
   * Determines if the key pressed is the shift key
   * */
  isShiftKey: (ev: React.KeyboardEvent | KeyboardEvent): boolean => {
    return ev.shiftKey;
  },

  /**
   * Determines if the key pressed is the space key
   * */
  isSpaceKey: (ev: React.KeyboardEvent | KeyboardEvent): boolean => {
    return ev.key === " ";
  },

  /**
   * Determines if the key pressed is the space key or enter key
   * */
  isEnterOrSpaceKey: (ev: React.KeyboardEvent | KeyboardEvent): boolean => {
    return ev.key === "Enter" || ev.key === " ";
  },

  /**
   * Determines if the key pressed is the home key
   * */
  isHomeKey: (ev: React.KeyboardEvent | KeyboardEvent): boolean => {
    return ev.key === "Home";
  },

  /**
   * Determines if the key pressed is the end key
   * */
  isEndKey: (ev: React.KeyboardEvent | KeyboardEvent): boolean => {
    return ev.key === "End";
  },

  /**
   * Gets the event's path which is an array of the objects on which listeners will be invoked.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Event/composedPath
   */
  composedPath: (ev: Event): EventTarget[] => {
    return ev.composedPath?.() || composedPath(ev);
  },
};

export default Events;
