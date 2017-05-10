// Globally enable the logger
let enabled = process.env.NODE_ENV !== 'production';

// Log the message
const log = (message, type) => {
  if (enabled) {
    console[type](message); // eslint-disable-line no-console
  }
};

/*
 * Logger
 *
 * Logger function will only output when enabled. By default this
 * enabled state is set when your NODE_ENV !== 'production'
 *
 * If you wish to enable or disable the logger globally you can import the Logger
 * and call setEnabledState(bool) passing the newState as a boolean.
 *
 * Methods
 * error - console.error
 * info - console.info
 * log - console.log
 * warn - console.warn
 * deprecate - console.warn which prepends the message with [Deprecation]
 *
 * To Use:
 *
 * ```
 * import Logger from 'carbon/lib/utils/logger';
 *
 * Logger.warn('My Message');
 *
 * ```
 */
const Logger = {
  setEnabledState: (newState) => {
    enabled = newState;
  },

  error: (message) => {
    log(message, 'error');
  },

  info: (message) => {
    log(message, 'info');
  },

  log: (message) => {
    log(message, 'log');
  },

  warn: (message) => {
    log(message, 'warn');
  },

  deprecate: (message) => {
    log(`[Deprecation] ${ message }`, 'warn');
  }
};

export default Logger;
