import * as React from "react";

export interface CardColumnProps {
  children: React.ReactNode;
  /** text alignment of the card section text */
  align?: "left" | "center" | "right";
}

declare function CardColumn(props: CardColumnProps): JSX.Element;

export default CardColumn;
