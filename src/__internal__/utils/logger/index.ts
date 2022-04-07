/* eslint-disable no-console */
// Globally enable the logger
let enabled = process.env.NODE_ENV !== "production";

/*
 * Logger
 *
 * Logger function will only output when enabled. By default this
 * enabled state is set when your NODE_ENV !== 'production'
 *
 * Methods
 * deprecate - console.warn which prepends the message with [Deprecation]
 *
 */
const Logger = {
  setEnabledState: (newState: boolean) => {
    enabled = newState;
  },

  deprecate: (message: string) => {
    if (enabled) {
      console.warn(`[Deprecation] ${message}`);
    }
  },
};

export default Logger;
