import { omit, difference } from "lodash";

/**
 * Ether
 *
 * Ether provides functional-like helper methods for Carbon specific tasks.
 * As we are dealing with stateful values (user input, browser state) Ether
 * does not provide pure functions in all cases.
 */

/**
 * Returns the props that were passed to a component but excludes the props listed in propTypes
 *
 * Optionally includes the safeProps which can be defined as a static property on a Class or passed as the second
 * argument.
 *
 * @method validProps
 * @param {Object} instance
 * @param {Array?} safeProps
 * @return {Object} props
 */
function validProps(instance, safeProps) {
  const component = instance.isReactComponent ? instance.constructor : instance;
  const unsafeProps = difference(
    Object.keys(component.propTypes),
    safeProps || component.safeProps || []
  );
  return omit(instance.props, unsafeProps);
}

// eslint-disable-next-line import/prefer-default-export
export { validProps };
