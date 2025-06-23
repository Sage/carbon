import React, { useLayoutEffect, useRef } from "react";
// import TokenCSSLoader from "__internal__/tokens-loader";
// import "@sage/design-tokens-fusion/css/product/all.css";
import useMediaQuery from "../../hooks/useMediaQuery";
import guid from "../../__internal__/utils/helpers/guid";

import TokensContext from "./tokens-context";
import "./carbon-tokens.css";

export type Modes = "dark" | "light";

export interface TokenWrapperProps {
  /** Content for the wrapper to wrap */
  children: React.ReactNode;
  /** Unique ID for the wrapper */
  id?: string;
  /** Sets colour mode to apply appropriate token set */
  mode?: Modes;
  largeScreenBreakpoint?: number;
}

export default ({
  children,
  mode,
  largeScreenBreakpoint = 800,
  id,
}: TokenWrapperProps) => {
  const wrapperId = useRef<string>(id || `carbon-tokens-wrapper-${guid()}`);
  const isLargeScreen = useMediaQuery(
    `(min-width: ${largeScreenBreakpoint}px)`,
  );

  useLayoutEffect(() => {
    const currentId = wrapperId.current;

    // Check if there is already a TokenWrapper already rendered
    if (!window.__CARBON_TOKENS_WRAPPER_ID__) {
      window.__CARBON_TOKENS_WRAPPER_ID__ = currentId;
    } else {
      throw new Error(
        "Only one instance of Carbon's TokensWrapper should be used at a time. Please ensure you are not wrapping your components multiple times.",
      );
    }

    return () => {
      if (window.__CARBON_TOKENS_WRAPPER_ID__ === currentId) {
        delete window.__CARBON_TOKENS_WRAPPER_ID__;
      }
    };
  }, []);

  useLayoutEffect(() => {
    document.body.classList.remove("mode-dark", "mode-light");
    console.log(`mode-${mode} class added`);
    document.body.classList.add(`mode-${mode}`);
  }, [mode]);

  useLayoutEffect(() => {
    document.body.classList.remove("screen-small", "screen-large");

    if (isLargeScreen) {
      console.log("LARGE SCREEN class added");
      document.body.classList.add("screen-large");
    } else {
      console.log("SMALL SCREEN class added");
      document.body.classList.add("screen-small");
    }
  }, [isLargeScreen]);

  return (
    <div id={wrapperId.current} className="carbon-tokens-wrapper">
      <TokensContext.Provider
        value={{ screenSize: isLargeScreen ? "large" : "small" }}
      >
        {children}
      </TokensContext.Provider>
    </div>
  );
};
