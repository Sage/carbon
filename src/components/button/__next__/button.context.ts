import React from "react";

export interface ButtonContextProps {
  isInsideButton?: boolean;
}

export default React.createContext<ButtonContextProps>({});
