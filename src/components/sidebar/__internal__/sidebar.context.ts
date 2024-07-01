import React from "react";

export interface SidebarContextProps {
  isInSidebar?: boolean;
}

export default React.createContext<SidebarContextProps>({});
