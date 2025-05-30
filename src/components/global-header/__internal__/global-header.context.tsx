import React, { createContext, useContext } from "react";

interface GlobalHeaderContextType {
  isWithinGlobalHeader: boolean;
}

const GlobalHeaderContext = createContext<GlobalHeaderContextType | undefined>(
  undefined,
);

export const useGlobalHeader = () => {
  const context = useContext(GlobalHeaderContext);
  if (!context) {
    return {
      isWithinGlobalHeader: false,
    };
  }
  return context;
};

export const GlobalHeaderProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <GlobalHeaderContext.Provider value={{ isWithinGlobalHeader: true }}>
      {children}
    </GlobalHeaderContext.Provider>
  );
};
