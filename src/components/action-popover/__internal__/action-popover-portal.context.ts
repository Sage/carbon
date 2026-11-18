import { createContext } from "react";

interface ActionPopoverPortalContextValue {
  renderInPortal: boolean;
}

const ActionPopoverPortalContext =
  createContext<ActionPopoverPortalContextValue>({ renderInPortal: false });

export default ActionPopoverPortalContext;
