/* eslint-disable no-console */
import getNodeEnv from "./get-node-env";

/**
 * Utility for dispatching messages to the browser console.
 * By default, logging is disabled in production mode.
 */
const Logger = {
  /** Logs warning-level message to browser console with [Deprecation] prefix */
  deprecate: (message: string) => {
    if (getNodeEnv() !== "production") {
      console.warn(`[Deprecation] ${message}`);
    }
  },

  /** Logs error-level message to browser console. Includes stack trace. */
  error: (message: string) => {
    if (getNodeEnv() !== "production") {
      console.error(message);
    }
  },

  /** Logs warning-level message to browser console */
  warn: (message: string) => {
    if (getNodeEnv() !== "production") {
      console.warn(message);
    }
  },
};

export default Logger;
