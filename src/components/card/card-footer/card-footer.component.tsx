import React, { useContext } from "react";
import {
  filterStyledSystemMarginProps,
  filterStyledSystemPaddingProps,
} from "../../../style/utils";
import StyledCardFooter, { StyledCardFooterProps } from "./card-footer.style";
import CardContext from "../__internal__/card-context";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags/tags";

export interface CardFooterProps
  extends Partial<StyledCardFooterProps>,
    Pick<TagProps, "data-element" | "data-role"> {
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
      spacing={spacing}
      variant={variant}
      {...filterStyledSystemMarginProps(rest)}
      {...filterStyledSystemPaddingProps(rest)}
      {...tagComponent("card-footer", {
        "data-element": "card-footer",
        ...rest,
      })}
      roundness={roundness}
    >
      {children}
    </StyledCardFooter>
  );
};

CardFooter.displayName = "CardFooter";
export default CardFooter;
