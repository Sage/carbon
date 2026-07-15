import React from "react";

import TokensWrapper from "../../src/components/tokens-wrapper";

interface TokensWrapperDemoProps {
  children?: React.ReactNode;
}

// prevents the light/dark mode switching as most of the components aren't wired up for it
const TokensWrapperDemo = ({ children }: TokensWrapperDemoProps) => {
  return <TokensWrapper modeOverride="light">{children}</TokensWrapper>;
};

export default TokensWrapperDemo;
