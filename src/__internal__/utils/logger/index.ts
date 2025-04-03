/* eslint-disable no-console */

// Globally enable the logger
let enabled = process.env.NODE_ENV !== "production";

/**
 * Utility for dispatching messages to the browser console.
 * By default, logging is disabled in production mode.
 */
const Logger = {
  setEnabledState: (newState: boolean) => {
    enabled = newState;
  },

  /** Logs warning-level message to browser console with [Deprecation] prefix */
  deprecate: (message: string) => {
    if (enabled) {
      console.warn(`[Deprecation] ${message}`);
    }
  },

  /** Logs error-level message to browser console. Includes stack trace. */
  error: (message: string) => {
    if (enabled) {
      console.error(message);
    }
  },
};

export default Logger;
