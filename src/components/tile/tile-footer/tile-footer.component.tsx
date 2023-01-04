import React from "react";
import { PaddingProps } from "styled-system";
import StyledTileFooter from "./tile-footer.style";

export interface TileFooterProps extends PaddingProps {
  children?: React.ReactNode;
  /** set which background color variant should be used */
  variant?: "default" | "black" | "transparent";
}

export const TileFooter = ({
  variant,
  children,
  ...props
}: TileFooterProps) => {
  return (
    <StyledTileFooter data-component="tile-footer" variant={variant} {...props}>
      {children}
    </StyledTileFooter>
  );
};

export default TileFooter;
