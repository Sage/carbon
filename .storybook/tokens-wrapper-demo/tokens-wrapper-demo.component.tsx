import React from "react";

import TokensWrapper from "../../src/components/tokens-wrapper";
import ModernisationWrapper from "../../src/components/modernisation-wrapper";

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
    <>
      <TokensWrapper modeSupportOptIn modeOverride="light">
        <div style={{ backgroundColor: "#fff" }}>
          <span style={{ color: "#fff" }}>DARK:</span>
          {modernisation ? (
            <ModernisationWrapper>{children}</ModernisationWrapper>
          ) : (
            children
          )}
        </div>
      </TokensWrapper>

      <TokensWrapper modeSupportOptIn modeOverride="dark">
        <div style={{ backgroundColor: "#000" }}>
          <span style={{ color: "#fff" }}>DARK:</span>
          {modernisation ? (
            <ModernisationWrapper>{children}</ModernisationWrapper>
          ) : (
            children
          )}
        </div>
      </TokensWrapper>
    </>
  );
};

export default TokensWrapperDemo;
