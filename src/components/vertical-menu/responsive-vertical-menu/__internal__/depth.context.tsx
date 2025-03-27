/**
 * Provides context which can be used to dynamcally track the depth of a component
 * in the component tree. This is useful for components that need to know their depth
 * in the tree for styling or layout purposes.
 */
import React, { createContext, useContext } from "react";

// Context to hold the current depth
const DepthContext = createContext<number>(0);

// Hook to use the depth context
export const useDepth = (): number => {
  // Get the current context value
  const context = useContext(DepthContext);

  // If context is undefined, it means the hook is being used outside of a DepthProvider
  /* istanbul ignore next */
  if (context === undefined) {
    throw new Error(
      "useDepth must be used within a DepthProvider. Please ensure you are using the correct context.",
    );
  }

  // Return the current depth value
  return context;
};

export const DepthProvider: React.FC<{
  children: React.ReactNode;
  value?: number;
}> = ({ children, value = 0 }) => {
  // Provide the current depth value to the context
  return (
    <DepthContext.Provider value={value}>{children}</DepthContext.Provider>
  );
};

export const IncreaseDepth: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const currentDepth = useDepth();

  // Increase the depth by 1 for the children
  return (
    <DepthContext.Provider value={currentDepth + 1}>
      {children}
    </DepthContext.Provider>
  );
};

export default DepthContext;
