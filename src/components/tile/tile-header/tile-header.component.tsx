import React from "react";
import { PaddingProps } from "styled-system";
import StyledTileHeader from "./tile-header.style";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";
import filterStyledSystemPaddingProps from "../../../style/utils/filter-styled-system-padding-props";
import Logger from "../../../__internal__/utils/logger";

export interface TileHeaderProps extends PaddingProps, TagProps {
  children?: React.ReactNode;
  /** set which background color variant should be used */
  variant?: "default" | "black" | "transparent" | "grey";
}

let deprecateWarningTriggered = false;

export const TileHeader = ({ variant, children, ...rest }: TileHeaderProps) => {
  if (!deprecateWarningTriggered) {
    Logger.deprecate(
      `The TileHeader component is deprecated and will soon be removed.`,
    );
    deprecateWarningTriggered = true;
  }

  return (
    <StyledTileHeader
      variant={variant}
      {...filterStyledSystemPaddingProps(rest)}
      {...tagComponent("tile-header", rest)}
    >
      {children}
    </StyledTileHeader>
  );
};

export default TileHeader;
