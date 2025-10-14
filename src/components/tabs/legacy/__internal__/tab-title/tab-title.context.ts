import React from "react";

interface TabTitleContextProps {
  isInTab?: boolean;
}

export default React.createContext<TabTitleContextProps>({});
