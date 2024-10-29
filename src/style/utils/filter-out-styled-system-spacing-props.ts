import { SpaceProps } from "styled-system";
import { marginPropertyNames } from "./filter-styled-system-margin-props";
import { paddingPropertyNames } from "./filter-styled-system-padding-props";

const filterOutStyledSystemSpacingProps = (
  props: Record<string, unknown> | SpaceProps,
): Record<string, unknown> =>
  Object.fromEntries(
    Object.entries(props).filter(
      ([key]) =>
        ![...marginPropertyNames, ...paddingPropertyNames].includes(key),
    ),
  );

export default filterOutStyledSystemSpacingProps;
