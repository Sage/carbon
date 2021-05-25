import * as React from "react";
import { SpaceProps } from "styled-system";
import { CardSizes } from "../card-types";

export interface CardFooterProps extends SpaceProps {
  children: React.ReactNode;
  /**
   * Predefined size of CardFooter for applying padding (small | medium | large).
   * For more granular control these can be over-ridden by Spacing props from styled-system.
   */
  spacing?: CardSizes;
}

declare function CardFooter(props: CardFooterProps): JSX.Element;

export default CardFooter;
