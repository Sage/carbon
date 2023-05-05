import React, { useContext } from "react";
import {
  filterStyledSystemMarginProps,
  filterStyledSystemPaddingProps,
} from "../../../style/utils";
import StyledCardFooter, { StyledCardFooterProps } from "./card-footer.style";
import CardContext from "../__internal__/card-context";

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
  const { roundness } = useContext(CardContext);

  return (
    <StyledCardFooter
      key="card-footer"
      data-element="card-footer"
      spacing={spacing}
      variant={variant}
      {...filterStyledSystemMarginProps(rest)}
      {...filterStyledSystemPaddingProps(rest)}
      roundness={roundness}
    >
      {children}
    </StyledCardFooter>
  );
};

CardFooter.displayName = "CardFooter";
export default CardFooter;
