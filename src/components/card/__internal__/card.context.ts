import createStrictContext from "../../../__internal__/utils/createStrictContext";
import { CardSpacing } from "../card.config";

export interface CardContextProps {
  /** Sets the level of roundness of the corners. "moderate" is 16px and "curved" is 20px.
   * "default" (alias for "moderate") and "large" (alias for "curved") are deprecated. Use "moderate" or "curved" instead.
   */
  roundness: "moderate" | "curved" | "default" | "large";
  /** Size of card for applying padding */
  spacing: CardSpacing;
}

const [CardProvider, useCardContext] = createStrictContext<CardContextProps>({
  name: "CardContext",
  errorMessage:
    "Carbon Card: Context not found. Have you wrapped your Carbon sub-components properly? See stack trace for more details.",
  defaultValue: {
    spacing: "medium",
    roundness: "moderate",
  },
});

export { CardProvider, useCardContext };
