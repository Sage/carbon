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
class BaseRegistry {
  /**
   * If no handler can be found, the registry will return this handler.
   *
   * @property defaultHandler
   * @type {Object}
   */
  defaultHandler = {
    call: (data) => {
      return data;
    }
  }

  /**
   * Property to store any registered handlers.
   *
   * @property handlers
   * @type {Object}
   */
  handlers = {}

  /**
   * Adds the given handler to the registry.
   *
   * @method register
   * @param {String} key
   * @param {Object} handler
   */
  register = (key, handler) => {
    this.handlers[key] = handler;
    return handler;
  }

  /**
   * Removes given handler from the registry by key
   *
   * @method register
   * @param {String} key
   */
  unregister = (key) => {
    delete this.handlers[key];
  }

  /**
   * Finds all relevant handlers. Additional params can be passed which will be
   * sent to the handler to determine if it should be used
   *
   * @method obtain
   * @return {Object}
   */
  obtain = (...params) => {
    const handlers = [];

    Object.keys(this.handlers).forEach((key) => {
      const handler = this.handlers[key];

      if (handler.check(...params)) {
        handlers.push(handler);
      }
    });

    if (!handlers.length) { handlers.push(this.defaultHandler); }

    return handlers;
  }
}

export default BaseRegistry;
