import React from "react";

export interface ButtonContextProps {
  isInsideTypicalButton?: boolean;
  isInsideDestructiveButton?: boolean;
  isInsidePrimaryButton?: boolean;
}

export default React.createContext<ButtonContextProps>({});
