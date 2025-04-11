import React from "react";
import Logger from "./logger";

type CreateStrictContextArgs<ContextType> = {
  /** The display name of the context. */
  name?: string;
  /** Error message to log if context is accessed outside its provider. */
  errorMessage: string;
  /** Default value to return if context is accessed outside its provider. */
  defaultValue: ContextType;
};

type CreateStrictContextReturn<ContextType> = readonly [
  React.Provider<ContextType | null>,
  () => ContextType,
];

/**
 * Creates a React context with a provider and a hook for accessing the context.
 * Logs an error and returns a default value if the hook is used outside of the provider.
 *
 * @example
 *
 * ```tsx
 * const [ListProvider, useList] = createStrictContext<{ size: number }>({
 *    name: "ListContext",
 *    errorMessage: "ListContext is undefined. Make sure to wrap your component with <ListProvider />",
 *    defaultValue: {
 *      size: 0,
 *    },
 * });
 * ```
 */
function createStrictContext<ContextType>({
  name,
  errorMessage,
  defaultValue,
}: CreateStrictContextArgs<ContextType>): CreateStrictContextReturn<ContextType> {
  const Context = React.createContext<ContextType | null>(null);
  Context.displayName = name;

  function useContext() {
    const context = React.useContext(Context);

    if (!context) {
      Logger.error(
        `${errorMessage}\nThis logged warning will become a thrown error in a future major release.`,
      );

      return defaultValue;
    }

    return context;
  }

  return [Context.Provider, useContext];
}

export default createStrictContext;
