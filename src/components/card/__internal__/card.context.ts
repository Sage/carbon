import React from "react";
import { CardSpacing } from "../card.config";

export interface CardContextProps {
  /** Sets the level of roundness of the corners, "default" is 8px and "large" is 16px */
  roundness?: "default" | "large";
  /** Size of card for applying padding */
  spacing: CardSpacing;
}

export default React.createContext<CardContextProps>({
  spacing: "medium",
});
