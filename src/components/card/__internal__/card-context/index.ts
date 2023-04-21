import React from "react";

export interface CardContextProps {
  /** Sets the level of roundness of the corners, "default" is 8px and "large" is 16px */
  roundness?: "default" | "large";
}

export default React.createContext<CardContextProps>({});
