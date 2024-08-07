import React from "react";

export type BatchSelectionContextType = {
  batchSelectionDisabled: boolean;
};

const BatchSelectionContext = React.createContext<BatchSelectionContextType>({
  batchSelectionDisabled: false,
});

export default BatchSelectionContext;
