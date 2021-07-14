import * as React from "react";
import * as OptionsHelper from "../../../utils/helpers/options-helper/options-helper";

export interface CardColumnProps {
  children: React.ReactNode;
  /** text alignment of the card section text */
  align?: OptionsHelper.AlignFull;
}

declare function CardColumn(props: CardColumnProps): JSX.Element;

export default CardColumn;
