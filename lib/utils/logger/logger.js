'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Globally enable the logger
var enabled = process.env.NODE_ENV !== 'production';

var delays = {};
var groupedMessages = {};

// Log the message
var _log = function _log(message, type) {
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (enabled) {
    if (opts.group) {
      // if a group is defined, collect all occurrences to output together
      groupedMessages[opts.group] = groupedMessages[opts.group] || [];
      groupedMessages[opts.group].push(message);

      var delay = delays[opts.group];

      if (delay) {
        clearTimeout(delay);
      }

      delays[opts.group] = setTimeout(function () {
        console[type](groupedMessages[opts.group][0], { // eslint-disable-line no-console
          all: groupedMessages[opts.group]
        });
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
 * You can also pass an option of 'group', this will group messages together that
 * share the same group name and are triggered within 500ms of one another.
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

  error: function error(message, opts) {
    _log(message, 'error', opts);
  },

  info: function info(message, opts) {
    _log(message, 'info', opts);
  },

  log: function log(message, opts) {
    _log(message, 'log', opts);
  },

  warn: function warn(message, opts) {
    _log(message, 'warn', opts);
  },

  deprecate: function deprecate(message, opts) {
    _log('[Deprecation] ' + message, 'warn', opts);
  }
};

exports.default = Logger;