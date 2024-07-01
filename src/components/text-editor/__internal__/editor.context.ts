import React from "react";

export default React.createContext<{
  onLinkAdded?: (url: string) => void;
  editMode?: boolean;
}>({});
