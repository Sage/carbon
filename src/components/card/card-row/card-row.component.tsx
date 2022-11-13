import React from "react";
import { filterStyledSystemPaddingProps } from "../../../style/utils";
import StyledCardRow, { StyledCardRowProps } from "./card-row.style";

export interface CardRowProps extends Partial<StyledCardRowProps> {
  /** Child nodes */
  children: React.ReactNode;
}

const CardRow = ({ children, spacing = "medium", ...rest }: CardRowProps) => {
  return (
    <StyledCardRow
      data-element="card-row"
      spacing={spacing}
      {...filterStyledSystemPaddingProps(rest)}
    >
      {children}
    </StyledCardRow>
  );
};

CardRow.displayName = "CardRow";
export default CardRow;
