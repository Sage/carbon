// Globally enable the logger
let enabled = process.env.NODE_ENV !== 'production';

const delays = {};
const groupedMessages = {};

// Log the message
const log = (message, type, opts = {}) => {
  if (enabled) {
    if (opts.group) {
      // if a group is defined, collect all occurrences to output together
      groupedMessages[opts.group] = groupedMessages[opts.group] || [];
      groupedMessages[opts.group].push(message);

      const delay = delays[opts.group];

      if (delay) {
        clearTimeout(delay);
      }

      delays[opts.group] = setTimeout(() => {
        console[type](groupedMessages[opts.group][0], {
          all: groupedMessages[opts.group]
        }); // eslint-disable-line no-console
      }, 500);
    } else {
      // output the message
      console[type](message); // eslint-disable-line no-console
    }
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

  error: (message, opts) => {
    log(message, 'error', opts);
  },

  info: (message, opts) => {
    log(message, 'info', opts);
  },

  log: (message, opts) => {
    log(message, 'log', opts);
  },

  warn: (message, opts) => {
    log(message, 'warn', opts);
  },

  deprecate: (message, opts) => {
    log(`[Deprecation] ${message}`, 'warn', opts);
  }
};

export default Logger;
