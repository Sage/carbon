'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Globally enable the logger
var enabled = process.env.NODE_ENV !== 'production';

// Log the message
var _log = function _log(message, type) {
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
var Logger = {
  setEnabledState: function setEnabledState(newState) {
    enabled = newState;
  },

  error: function error(message) {
    _log(message, 'error');
  },

  info: function info(message) {
    _log(message, 'info');
  },

  log: function log(message) {
    _log(message, 'log');
  },

  warn: function warn(message) {
    _log(message, 'warn');
  },

  deprecate: function deprecate(message) {
    _log('[Deprecation] ' + message, 'warn');
  }
};

exports.default = Logger;