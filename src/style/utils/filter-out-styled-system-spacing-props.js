import styledSystemPropTypes from "@styled-system/prop-types";

const filterOutStyledSystemSpacingProps = (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(([key]) => !styledSystemPropTypes.space[key])
  );

export default filterOutStyledSystemSpacingProps;
