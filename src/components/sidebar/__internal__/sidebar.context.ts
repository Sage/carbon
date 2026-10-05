import React from "react";

export interface SidebarContextProps {
  isInSidebar?: boolean;
  isStickyContentFocusable?: boolean;
}

export default React.createContext<SidebarContextProps>({});
