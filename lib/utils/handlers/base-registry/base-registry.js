"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Base Registry class, for building handler patterns.
 *
 * == How to create a handler pattern:
 *
 * In your file, create your own registry class which exports from the base
 * registry class. Initialise your registry and export it.
 *
 *   import BaseRegistry from 'carbon-react/lib/utils/handlers/base-registry';
 *
 *   class MyRegistry extends BaseRegistry {};
 *
 *   export default new MyRegistry;
 *
 * @class BaseRegistry
 * @constructor
 */
var BaseRegistry = function BaseRegistry() {
  var _this = this;

  _classCallCheck(this, BaseRegistry);

  this.defaultHandler = {
    call: function call(data) {
      return data;
    }

    /**
     * Property to store any registered handlers.
     *
     * @property handlers
     * @type {Object}
     */
  };
  this.handlers = {};

  this.register = function (key, handler) {
    _this.handlers[key] = handler;
    return handler;
  };

  this.unregister = function (key) {
    delete _this.handlers[key];
  };

  this.obtain = function () {
    for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }

    var handlers = [];

    Object.keys(_this.handlers).forEach(function (key) {
      var handler = _this.handlers[key];

      if (handler.check.apply(handler, params)) {
        handlers.push(handler);
      }
    });

    if (!handlers.length) {
      handlers.push(_this.defaultHandler);
    }

    return handlers;
  };
}
/**
 * If no handler can be found, the registry will return this handler.
 *
 * @property defaultHandler
 * @type {Object}
 */


/**
 * Adds the given handler to the registry.
 *
 * @method register
 * @param {String} key
 * @param {Object} handler
 */


/**
 * Removes given handler from the registry by key
 *
 * @method register
 * @param {String} key
 */


/**
 * Finds all relevant handlers. Additional params can be passed which will be
 * sent to the handler to determine if it should be used
 *
 * @method obtain
 * @return {Object}
 */
;

exports.default = BaseRegistry;