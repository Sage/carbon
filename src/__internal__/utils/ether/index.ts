import { omit, difference } from "lodash";

interface ComponentInterface {
  propTypes: Record<string, unknown>;
  props: Record<string, unknown>;
  safeProps?: string[];
}

/**
 * Returns the props that were passed to a component but excludes the props listed in propTypes
 *
 * Optionally includes the safeProps which can be defined as a static property on a Class or passed as the second
 * argument.
 *
 */
function validProps(
  component: ComponentInterface,
  safeProps?: string[]
): Record<string, unknown> {
  const unsafeProps: string[] = difference(
    Object.keys(component.propTypes),
    safeProps || component.safeProps || []
  );
  return omit(component.props, unsafeProps);
}

// eslint-disable-next-line import/prefer-default-export
export { validProps };
