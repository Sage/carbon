import React from "react";

export interface ModalContextProps {
  isInModal?: boolean;
  isAnimationComplete?: boolean;
  triggerRefocusFlag?: boolean;
}

export default React.createContext<ModalContextProps>({});
