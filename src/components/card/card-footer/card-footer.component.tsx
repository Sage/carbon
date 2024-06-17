import React, { useContext } from "react";
import { SpaceProps } from "styled-system";
import {
  filterStyledSystemMarginProps,
  filterStyledSystemPaddingProps,
} from "../../../style/utils";
import StyledCardFooter from "./card-footer.style";
import CardContext, { CardContextProps } from "../__internal__/card.context";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags/tags";

export interface CardFooterProps
  extends SpaceProps,
    Pick<CardContextProps, "roundness">,
    Pick<TagProps, "data-element" | "data-role"> {
  /** Child nodes */
  children: React.ReactNode;
  /** Specify styling variant to render */
  variant?: "default" | "transparent";
}

const CardFooter = ({
  children,
  variant = "default",
  ...rest
}: CardFooterProps) => {
  const { roundness, spacing } = useContext(CardContext);

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
