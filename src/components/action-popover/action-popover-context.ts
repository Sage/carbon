import React from "react";

type ActionPopoverContextType = {
  setOpenPopover: (isOpen: boolean) => void;
  focusButton: () => void;
  isOpenPopover: boolean;
};

const ActionPopoverContext =
  React.createContext<ActionPopoverContextType | null>(null);

export default ActionPopoverContext;
