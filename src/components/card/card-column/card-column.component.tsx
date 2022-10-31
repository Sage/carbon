import React from "react";
import StyledCardColumn, { StyledCardColumnProps } from "./card-column.style";

export interface CardColumnProps extends Partial<StyledCardColumnProps> {
  /** Child elements */
  children: React.ReactNode;
}

const CardColumn = ({ align = "center", children }: CardColumnProps) => (
  <StyledCardColumn align={align} data-element="card-column">
    {children}
  </StyledCardColumn>
);

CardColumn.displayName = "CardColumn";
export default CardColumn;
