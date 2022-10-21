import React from "react";
import {
  filterStyledSystemMarginProps,
  filterStyledSystemPaddingProps,
} from "../../../style/utils";
import StyledCardFooter, { StyledCardFooterProps } from "./card-footer.style";

export interface CardFooterProps extends Partial<StyledCardFooterProps> {
  /** Child nodes */
  children: React.ReactNode;
}

const CardFooter = ({
  spacing = "medium",
  children,
  variant = "default",
  ...rest
}: CardFooterProps) => {
  return (
    <StyledCardFooter
      key="card-footer"
      data-element="card-footer"
      spacing={spacing}
      variant={variant}
      {...filterStyledSystemMarginProps(rest)}
      {...filterStyledSystemPaddingProps(rest)}
    >
      {children}
    </StyledCardFooter>
  );
};

CardFooter.displayName = "CardFooter";
export default CardFooter;
