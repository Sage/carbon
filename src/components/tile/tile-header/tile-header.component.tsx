import React from "react";
import { PaddingProps } from "styled-system";
import Box from "../../box";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";
import filterStyledSystemPaddingProps from "../../../style/utils/filter-styled-system-padding-props";

export interface TileHeaderProps extends PaddingProps, TagProps {
  children?: React.ReactNode;
  /** set which background color variant should be used */
  variant?: "default" | "black" | "transparent" | "grey";
}

const VARIANT_BACKGROUND_COLOR_MAP = {
  transparent: "transparent",
  black: "var(--colorsUtilityYin100)",
  grey: "var(--colorsUtilityMajor025)",
  default: "var(--colorsUtilityMajor100)",
};

/** @deprecated The `TileHeader` component is deprecated and will be removed in a future version. Please use the `Box` component instead. */
export const TileHeader = ({ variant, children, ...rest }: TileHeaderProps) => (
  <Box
    backgroundColor={VARIANT_BACKGROUND_COLOR_MAP[variant || "default"]}
    borderRadius="borderRadius400 borderRadius400 borderRadius000 borderRadius000"
    {...filterStyledSystemPaddingProps(rest)}
    {...tagComponent("tile-header", rest)}
  >
    {children}
  </Box>
);

export default TileHeader;
