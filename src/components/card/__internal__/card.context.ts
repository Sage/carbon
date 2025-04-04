import createContext from "../../../__internal__/utils/createContext";
import { CardSpacing } from "../card.config";

export interface CardContextProps {
  /** Sets the level of roundness of the corners, "default" is 8px and "large" is 16px */
  roundness: "default" | "large";
  /** Size of card for applying padding */
  spacing: CardSpacing;
}

const [CardProvider, useCardContext] = createContext.strict<CardContextProps>({
  name: "CardContext",
  errorMessage:
    "Carbon Card: Context not found. Have you wrapped your Carbon subcomponents properly? See stack trace for more details.",
  defaultValue: {
    spacing: "medium",
    roundness: "default",
  },
});

export { CardProvider, useCardContext };
