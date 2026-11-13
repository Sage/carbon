import { createContext } from "react";

interface ActionPopoverFocusContextValue {
  restoreFocusOnClickAway: boolean;
}

const ActionPopoverFocusContext = createContext<ActionPopoverFocusContextValue>(
  { restoreFocusOnClickAway: true },
);

export default ActionPopoverFocusContext;
