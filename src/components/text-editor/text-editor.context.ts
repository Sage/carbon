import React from "react";

// This is the context that is used to enable cross-component communication
export default React.createContext<{
  onLinkAdded?: (link: string, state: string) => void;
  readOnly?: boolean;
}>({});
