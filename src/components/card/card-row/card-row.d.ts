import * as React from "react";
import { PaddingProps } from "styled-system";
import * as OptionsHelper from "../../../utils/helpers/options-helper/options-helper";

export interface CardRowProps extends PaddingProps {
  children: React.ReactNode;
  /**
   * Spacing prop is set in Card and defines the padding for the CardRow (the first CardRow has no padding by default).
   * For more granular control of CardRow padding these can be over-ridden by Padding props from styled-system.
   */
   spacing?: OptionsHelper.SizesRestricted;
}

declare function CardRow(props: CardRowProps): JSX.Element;

export default CardRow;
