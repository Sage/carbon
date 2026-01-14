import React from "react";
import { PaddingProps } from "styled-system";
import StyledTileFooter from "./tile-footer.style";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";
import filterStyledSystemPaddingProps from "../../../style/utils/filter-styled-system-padding-props";

export interface TileFooterProps extends PaddingProps, TagProps {
  children?: React.ReactNode;
  /** set which background color variant should be used */
  variant?: "default" | "black" | "transparent" | "grey";
}

const TileFooter = ({ variant, children, ...rest }: TileFooterProps) => (
  <StyledTileFooter
    variant={variant}
    {...filterStyledSystemPaddingProps(rest)}
    {...tagComponent("tile-footer", rest)}
  >
    {children}
  </StyledTileFooter>
);

export default TileFooter;
