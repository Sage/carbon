import { find } from 'lodash';

/**
 * Base Registry class, for building handler patterns.
 *
 * == How to create a handler pattern:
 *
 * In your file, create your own registry class which exports from the base
 * registry class. Initialise your registry and export it.
 *
 *   import BaseRegistry from 'carbon/lib/utils/handlers/base-registry';
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
    call: (...params) => {
      return ...params;
    }
  }

  /**
   * Property to store any registered handlers.
   *
   * @property handlers
   * @type {Array}
   */
  handlers = []

  /**
   * Adds the given handler to the registry.
   *
   * @method register
   * @param {Object} handler
   */
  register = (handler) => {
    this.handlers.push(handler);
  }

  /**
   * Finds the relevant handler. Additional params can be passed which will be
   * sent to the handler to determine if it is the correct one to use.
   *
   * @method obtain
   * @return {Object}
   */
  obtain = (...params) => {
    let handler = find(this.handlers, (handler) => {
      return handler.check(...params);
    });

    return handler || this.defaultHandler;
  }
}

export default BaseRegistry;
