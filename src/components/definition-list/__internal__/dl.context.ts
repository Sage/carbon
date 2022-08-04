import React from "react";

interface DlContextProps {
  asSingleColumn?: boolean;
}

export default React.createContext<DlContextProps>({});
