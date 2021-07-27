import * as React from "react";
import { MarginProps } from "styled-system";
import { CardSizes } from "./card-types";

export interface CardProps extends MarginProps {
  /** action to be executed when card is clicked or enter pressed */
  action?: (ev: React.MouseEvent<HTMLDivElement>) => void;
  children: React.ReactNode;
  /** style value for width of card */
  cardWidth?: string;
  /** flag to indicate if card is interactive */
  interactive?: boolean;
  /** flag to indicate if card is draggable */
  draggable?: boolean;
  /** size of card for applying padding (small | medium | large) */
  spacing?: CardSizes;
  dataRole?: string;
}

declare function Card(props: CardProps): JSX.Element;

export default Card;
