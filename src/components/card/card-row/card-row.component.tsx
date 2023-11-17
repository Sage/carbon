import React, { useContext, useRef } from "react";
import { PaddingProps } from "styled-system";
import { filterStyledSystemPaddingProps } from "../../../style/utils";
import StyledCardRow from "./card-row.style";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags/tags";
import CardContext from "../__internal__/card-context";
import guid from "../../../__internal__/utils/helpers/guid";

export interface CardRowProps
  extends PaddingProps,
    Pick<TagProps, "data-element" | "data-role"> {
  /** Child nodes */
  children: React.ReactNode;
}

const CardRow = ({ children, ...rest }: CardRowProps) => {
  const { spacing, firstRowId, rowCount } = useContext(CardContext);
  const id = useRef(guid());

  const getComputedPadding = () => {
    if (firstRowId === id.current) {
      return rowCount === 1 ? { pt: 0 } : { py: 0 };
    }

    return {};
  };

  return (
    <StyledCardRow
      id={id.current}
      spacing={spacing}
      {...getComputedPadding()}
      {...filterStyledSystemPaddingProps(rest)}
      {...tagComponent("card-row", { "data-element": "card-row", ...rest })}
    >
      {children}
    </StyledCardRow>
  );
};

CardRow.displayName = "CardRow";
export default CardRow;
