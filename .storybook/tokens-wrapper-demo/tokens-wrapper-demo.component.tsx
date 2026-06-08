/* This is a temporary wrapper to allow Storybook to switch between light and dark mode */
import React from "react";

import TokensWrapper from "../../src/components/tokens-wrapper";

interface TokensWrapperDemoProps {
  children?: React.ReactNode;
  modeOverride?: "light" | "dark";
  allowOverrides?: boolean;
}

const overrides = {
  light: {
    primary: "#db004e", // brand default
    primaryHover: "#c50046", // ~10% darker
    primaryActive: "#af003e", // ~20% darker
    onPrimary: "#ffffff", // white text works on this dark red
  },
  dark: {
    primary: "#ff69b4", // bright pink works on dark bg
    primaryHover: "#ff82c4", // ~10% lighter (dark mode goes lighter on hover)
    primaryActive: "#ff9bd4", // ~20% lighter
    onPrimary: "#000000", // black text needed — #ff69b4 is too light for white
  },
};

const TokensWrapperDemo = ({
  children,
  modeOverride,
  allowOverrides,
}: TokensWrapperDemoProps) => {
  return (
    <TokensWrapper
      modeSupportOptIn
      modeOverride={modeOverride}
      overrides={allowOverrides ? overrides : undefined}
    >
      {children}
    </TokensWrapper>
  );
};

export default TokensWrapperDemo;
