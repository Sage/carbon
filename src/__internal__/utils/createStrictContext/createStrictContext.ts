import React from "react";

type CreateStrictContextArgs<ContextType> = {
  /** The display name of the context. */
  name?: string;
  /** Error message to throw if context is accessed outside its provider. */
  errorMessage: string;
};

type CreateStrictContextReturn<ContextType> = readonly [
  React.Provider<ContextType | null>,
  () => ContextType,
];

/**
 * Creates a React context with a provider and a hook for accessing the context.
 * Throws an error if the hook is used outside of the provider.
 *
 * @example
 *
 * ```tsx
 * const [ListProvider, useList] = createStrictContext<{ size: number }>({
 *    name: "ListContext",
 *    errorMessage: "ListContext is undefined. Make sure to wrap your component with <ListProvider />",
 * });
 * ```
 */
function createStrictContext<ContextType>({
  name,
  errorMessage,
}: CreateStrictContextArgs<ContextType>): CreateStrictContextReturn<ContextType> {
  const Context = React.createContext<ContextType | null>(null);
  Context.displayName = name;

  function useContext() {
    const context = React.useContext(Context);

    if (!context) {
      throw new Error(errorMessage);
    }

    return context;
  }

  return [Context.Provider, useContext];
}

export default createStrictContext;
