import styledSystemPropTypes from "@styled-system/prop-types";

const filterOutStyledSystemSpacingProps = (
  obj: Record<string, unknown>
): Record<string, unknown> =>
  Object.fromEntries(
    Object.entries(obj).filter(([key]) => !styledSystemPropTypes.space[key])
  );

export default filterOutStyledSystemSpacingProps;
