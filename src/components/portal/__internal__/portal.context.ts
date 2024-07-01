import React from "react";

export interface PortalContextProps {
  renderInRoot?: boolean;
}

export default React.createContext<PortalContextProps>({});
