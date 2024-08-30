import React from "react";

export type BreadcrumbsContextType = {
  isDarkBackground: boolean;
};

const BreadcrumbsContext = React.createContext<BreadcrumbsContextType>({
  isDarkBackground: false,
});

export default BreadcrumbsContext;
