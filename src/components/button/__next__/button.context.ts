import React from "react";

export interface ButtonContextProps {
  isInsideButton?: boolean;
  isColouredSurface?: boolean;
}

export default React.createContext<ButtonContextProps>({});
