import Immutable from 'immutable';
import { isEqualWith } from 'lodash';

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
export default function(scope, nextProps, nextState) {
  return !isEqualWith(scope.props, nextProps, customCheck) || !isEqualWith(scope.state, nextState, customCheck);
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
function customCheck(current, next, key) {
  if (key == "validations") {
    // validations are new objects each time - and only need to update the component
    // when the value changes so we can safely skip them.
    return true;
  }

  // if immutable object, do custom comparison. otherwise return undefined to
  // allow isEqual to continue as normal
  if (Immutable.Iterable.isIterable(current)) {
    return Immutable.is(current, next);
  } else {
    return void 0;
  }
}
