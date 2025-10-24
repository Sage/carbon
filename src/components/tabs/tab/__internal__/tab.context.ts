import React from "react";

export interface TabContextProps {
  setError?: (childId: string, error?: boolean | string) => void;
  setWarning?: (childId: string, warning?: boolean | string) => void;
  setInfo?: (childId: string, info?: boolean | string) => void;
}

export const TabContext = React.createContext<TabContextProps>({});

export default TabContext;
