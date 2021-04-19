import Immutable from "immutable";
import { isEqualWith } from "lodash";
import Logger from "../../logger/logger";

/**
 * A shouldComponentUpdate helper. Run this method with your instance, nextProps and nextState
 * and it will perform a deep comparison of the properties - handling immutable objects.
 *
 * @method
 * @param {Object} scope
 * @param {Object} nextProps
 * @param {Object} nextState
 * @return {Boolean}
 */

let deprecatedWarnTriggered = false;

export default function (scope, nextProps, nextState) {
  if (!deprecatedWarnTriggered) {
    deprecatedWarnTriggered = true;
    // eslint-disable-next-line max-len
    Logger.deprecate(
      "`ShouldComponentUpdate` helper is deprecated and will soon be removed"
    );
  }

  return (
    !isEqualWith(scope.props, nextProps, customCheck) ||
    !isEqualWith(scope.state, nextState, customCheck)
  );
}

/**
 * Performs a custom check of parameters from the isEqual method.
 *
 * @method customCheck
 * @param current - could be any type
 * @param next - could be any type
 * @param {String} key
 * @private
 */
function customCheck(current, next) {
  // if immutable object, do custom comparison. otherwise return undefined to
  // allow isEqual to continue as normal
  if (Immutable.Iterable.isIterable(current)) {
    return Immutable.is(current, next);
  }
  return undefined;
}
