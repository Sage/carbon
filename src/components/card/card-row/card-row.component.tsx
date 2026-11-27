import React from "react";
import { PaddingProps } from "styled-system";
import { filterStyledSystemPaddingProps } from "../../../style/utils";
import StyledCardRow from "./card-row.style";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags/tags";
import { useCardContext } from "../__internal__/card.context";
import useIdPolyfill from "../../../hooks/__internal__/useIdPolyfill";

export interface CardRowProps extends PaddingProps, TagProps {
  /** Child nodes */
  children: React.ReactNode;
}

/** @deprecated `CardRow` has been deprecated. */
const CardRow = ({ children, ...rest }: CardRowProps) => {
  const { spacing } = useCardContext();
  const id = useIdPolyfill();

  return (
    <StyledCardRow
      id={id}
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
