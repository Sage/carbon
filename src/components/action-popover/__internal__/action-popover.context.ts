import React from "react";

export type Alignment = "left" | "right";

type ActionPopoverContextType = {
  setOpenPopover: (isOpen: boolean) => void;
  focusButton: () => void;
  submenuPosition: Alignment;
};

const ActionPopoverContext =
  React.createContext<ActionPopoverContextType | null>(null);

export default ActionPopoverContext;
