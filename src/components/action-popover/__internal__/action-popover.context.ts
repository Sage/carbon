import React, { createContext, useContext } from "react";
import invariant from "invariant";

export type Alignment = "left" | "right";

type ActionPopoverContextType = {
  setOpenPopover: (isOpen: boolean) => void;
  focusButton: () => void;
  horizontalAlignment: Alignment;
  submenuPosition: Alignment;
  /** id of the submenu that is currently open, so only one can be open at a time */
  openSubmenuId: string | null;
  setOpenSubmenuId: React.Dispatch<React.SetStateAction<string | null>>;
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
