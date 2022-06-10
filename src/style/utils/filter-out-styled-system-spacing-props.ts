import styledSystemPropTypes from "@styled-system/prop-types";

const filterOutStyledSystemSpacingProps = (
  // method should accept any react prop
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: Record<string, any>
): Record<string, unknown> =>
  Object.fromEntries(
    Object.entries(props).filter(([key]) => !styledSystemPropTypes.space[key])
  );

export default filterOutStyledSystemSpacingProps;
