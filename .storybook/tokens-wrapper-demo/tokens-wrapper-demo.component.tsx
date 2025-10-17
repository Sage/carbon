/* This is a temporary wrapper to allow Storybook to switch between light and dark mode */
import React from "react";

import TokensWrapper from "../../src/components/tokens-wrapper";
import useModeSwitcher from "../../src/components/tokens-wrapper/__internal__/hooks";

interface TokensWrapperDemoProps {
  children?: React.ReactNode;
  modeOverride?: "light" | "dark";
}

const TokensWrapperDemo = ({
  children,
  modeOverride,
}: TokensWrapperDemoProps) => {
  const modePreference = useModeSwitcher(modeOverride);

  return (
    <TokensWrapper>
      <div
        data-component="tokens-wrapper-demo"
        className={`carbon-${modePreference}-mode`}
        data-carbon-theme={modePreference === "dark" ? "dark" : "light"}
      >
        {children}
      </div>
    </TokensWrapper>
  );
};

export default TokensWrapperDemo;
