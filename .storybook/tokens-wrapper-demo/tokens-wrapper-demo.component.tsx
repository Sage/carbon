import React from "react";

import TokensWrapper from "../../src/components/tokens-wrapper";
import ModernisationWrapper from "../modernisation-wrapper";

interface TokensWrapperDemoProps {
  children?: React.ReactNode;
  modernisation?: boolean;
}

// prevents the light/dark mode switching as most of the components aren't wired up for it
const TokensWrapperDemo = ({
  children,
  modernisation = false,
}: TokensWrapperDemoProps) => {
  return (
    <TokensWrapper modeSupportOptIn modeOverride="light">
      {modernisation ? (
        <ModernisationWrapper>{children}</ModernisationWrapper>
      ) : (
        children
      )}
    </TokensWrapper>
  );
};

export default TokensWrapperDemo;
