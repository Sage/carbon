import React from "react";

export type Alignment = "left" | "right";

type ActionPopoverContextType = {
  setOpenPopover: (isOpen: boolean) => void;
  focusButton: () => void;
  submenuPosition: Alignment;
  isOpenPopover: boolean;
};

const ActionPopoverContext =
  React.createContext<ActionPopoverContextType | null>(null);

export default ActionPopoverContext;
