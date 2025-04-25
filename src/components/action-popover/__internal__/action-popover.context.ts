import { createContext, useContext } from "react";
import invariant from "invariant";

export type Alignment = "left" | "right";

type ActionPopoverContextType = {
  setOpenPopover: (isOpen: boolean) => void;
  focusButton: () => void;
  horizontalAlignment: Alignment;
  submenuPosition: Alignment;
};

const ActionPopoverContext = createContext<ActionPopoverContextType | null>(
  null,
);

export const ActionPopoverProvider = ActionPopoverContext.Provider;

export const useActionPopoverContext = (): ActionPopoverContextType => {
  const context = useContext(ActionPopoverContext);

  invariant(
    context,
    "Carbon ActionPopover: Context not found. Have you wrapped your Carbon subcomponents properly? See stack trace for more details.",
  );

  return context;
};
