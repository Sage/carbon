import React from "react";

export interface MultiActionButtonContextProps {
  align?: "left" | "right";
}

export default React.createContext<MultiActionButtonContextProps>({});
