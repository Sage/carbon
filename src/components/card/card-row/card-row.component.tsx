import React from "react";
import { filterStyledSystemPaddingProps } from "../../../style/utils";
import StyledCardRow, { StyledCardRowProps } from "./card-row.style";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags/tags";

export interface CardRowProps
  extends Partial<StyledCardRowProps>,
    Pick<TagProps, "data-element" | "data-role"> {
  /** Child nodes */
  children: React.ReactNode;
}

const CardRow = ({ children, spacing = "medium", ...rest }: CardRowProps) => {
  return (
    <StyledCardRow
      spacing={spacing}
      {...filterStyledSystemPaddingProps(rest)}
      {...tagComponent("card-row", { "data-element": "card-row", ...rest })}
    >
      {children}
    </StyledCardRow>
  );
};

CardRow.displayName = "CardRow";
export default CardRow;
