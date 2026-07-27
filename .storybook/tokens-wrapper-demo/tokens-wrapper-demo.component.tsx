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
    primary: "#db004e",
    primaryHover: "#c50046",
    primaryActive: "#af003e",
    onPrimary: "#ffffff",
    inverse: {
      primary: "#ff69b4",
      primaryHover: "#ff82c4",
      primaryActive: "#ff9bd4",
      onPrimary: "#000000",
    },
  },
  dark: {
    primary: "#ff69b4",
    primaryHover: "#ff82c4",
    primaryActive: "#ff9bd4",
    onPrimary: "#000000",
    inverse: {
      primary: "#db004e",
      primaryHover: "#c50046",
      primaryActive: "#af003e",
      onPrimary: "#ffffff",
    },
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
