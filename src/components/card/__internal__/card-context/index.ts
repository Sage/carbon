import React from "react";
import { CardSpacing } from "../../card.config";

export interface CardContextProps {
  /** Sets the level of roundness of the corners, "default" is 8px and "large" is 16px */
  roundness?: "default" | "large";
  /** Size of card for applying padding */
  spacing: CardSpacing;
  /**
   * @ignore @private
   * id for first row
   * */
  firstRowId: string;
  /**
   * @ignore @private
   * total count of rows rendered in card
   * */
  rowCount: number;
}

export default React.createContext<CardContextProps>({
  spacing: "medium",
  firstRowId: "",
  rowCount: 0,
});
