import React from "react";

interface SelectTextboxContextType {
  prefixId?: string;
  selectType?: "simple" | "filterable" | "multi";
}

export default React.createContext<SelectTextboxContextType>({});
