import React from "react";

export type SelectTextboxContextProps = {
  isInputInSelect?: boolean;
};

export const SelectTextboxContext =
  React.createContext<SelectTextboxContextProps>({});
