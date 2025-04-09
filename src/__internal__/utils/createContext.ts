import React from "react";
import logger from "./logger";

type StrictArgs<ContextType> = {
  /** The display name of the context. */
  name?: string;
  /** Error message to log if context is accessed outside its provider. */
  errorMessage: string;
  /** Default value to return if context is accessed outside its provider. */
  defaultValue: ContextType;
};

type NonStrictArgs = {
  /** The display name of the context. */
  name?: string;
};

type StrictReturn<ContextType> = readonly [
  React.Provider<ContextType | null>,
  () => ContextType,
];

type NonStrictReturn<ContextType> = readonly [
  React.Provider<ContextType | null>,
  () => ContextType | null,
];

const createContext = {
  /**
   * Creates React context with a provider and a hook to use the context.
   * If the hook is used outside of the provider, it will log an error message and return a default value.
   *
   * @example
   *
   * ```tsx
   * const [ThemeProvider, useTheme] = createContext.strict<"light" | "dark">({
   *    name: "ThemeContext",
   *    errorMessage: "ThemeContext is undefined. Make sure to wrap your component with <ThemeProvider />",
   *    defaultValue: "light",
   * });
   * ```
   */
  strict: <ContextType>(
    args: StrictArgs<ContextType>,
  ): StrictReturn<ContextType> => {
    const { name, errorMessage, defaultValue } = args;

    const Context = React.createContext<ContextType | null>(null);
    Context.displayName = name;

    function useContext() {
      const context = React.useContext(Context);

      if (!context) {
        logger.error(
          `${errorMessage}\nThis logged warning will become a thrown error in a future major release.`,
        );

        return defaultValue;
      }

      return context;
    }

    return [Context.Provider, useContext] as const;
  },

  /**
   * Creates React context with a provider and a hook to use the context.
   * If the hook is used outside of the provider, it will return null.
   *
   * @example
   *
   * ```tsx
   * const [ThemeProvider, useTheme] = createContext.nonStrict<"light" | "dark">({
   *    name: "ThemeContext",
   * });
   * ```
   *
   * @returns {Array} - An array containing the context provider and a hook to use the context.
   */
  nonStrict: <ContextType>(
    args: NonStrictArgs = {},
  ): NonStrictReturn<ContextType> => {
    const { name } = args;

    const Context = React.createContext<ContextType | null>(null);
    Context.displayName = name;

    function useContext() {
      return React.useContext(Context);
    }

    return [Context.Provider, useContext] as const;
  },
};

export default createContext;
