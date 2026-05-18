/* This is a temporary wrapper to allow Storybook to switch between light and dark mode */
import React from "react";

import TokensWrapper from "../../src/components/tokens-wrapper";

interface TokensWrapperDemoProps {
  children?: React.ReactNode;
  modeOverride?: "light" | "dark";
}

const TokensWrapperDemo = ({
  children,
  modeOverride,
}: TokensWrapperDemoProps) => {
  return (
    <TokensWrapper modeSupportOptIn modeOverride={modeOverride}>
      {children}
    </TokensWrapper>
  );
};

export default TokensWrapperDemo;
