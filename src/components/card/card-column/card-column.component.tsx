import React from "react";
import StyledCardColumn, { StyledCardColumnProps } from "./card-column.style";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags/tags";

export interface CardColumnProps
  extends Partial<StyledCardColumnProps>,
    TagProps {
  /** Child elements */
  children: React.ReactNode;
}

const CardColumn = ({
  align = "center",
  children,
  ...rest
}: CardColumnProps) => (
  <StyledCardColumn
    align={align}
    {...tagComponent("card-column", { "data-element": "card-column", ...rest })}
  >
    {children}
  </StyledCardColumn>
);

CardColumn.displayName = "CardColumn";
export default CardColumn;
