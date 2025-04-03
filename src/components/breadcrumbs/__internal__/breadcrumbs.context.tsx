import React from "react";
import Logger from "../../../__internal__/utils/logger";

export type BreadcrumbsContextType = {
  isDarkBackground: boolean;
};

const BreadcrumbsContext = React.createContext<BreadcrumbsContextType | null>(
  null,
);

const useBreadcrumbs = (errorMessage: string) => {
  const context = React.useContext(BreadcrumbsContext);

  if (!context) {
    // TODO: Replace logged warning with a runtime error in a future release
    Logger.warn(errorMessage);
    return { isDarkBackground: false };
  }

  return context;
};

export { BreadcrumbsContext, useBreadcrumbs };
