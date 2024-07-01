import React from "react";

export interface DrawerSidebarContextProps {
  isInSidebar: boolean;
}

export default React.createContext<DrawerSidebarContextProps>({
  isInSidebar: false,
});
