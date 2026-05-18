import React from "react";
import styled, { createGlobalStyle } from "styled-components";

import STATIC_TOKENS_CSS from "./__internal__/static-tokens";
import useModeSwitcher from "./__internal__/hooks/useModeSwitcher";

export interface TokenWrapperProps {
  children: React.ReactNode;
  height?: string;
  modeSupportOptIn?: boolean;
  modeOverride?: "light" | "dark" | "auto";
}

const StyledTokensWrapper = styled.div<{ $height?: string }>`
  height: ${({ $height }) => $height};
`;

const TokensGlobalStyle = createGlobalStyle`
  [data-component="tokens-wrapper"],
  [class*="carbon-portal"] {
    ${STATIC_TOKENS_CSS}
  }
`;

export const TokensWrapper = ({
  children,
  height = "auto",
  modeSupportOptIn = false,
  modeOverride,
}: TokenWrapperProps) => {
  const modePreference = useModeSwitcher(modeOverride);
  const modeProps = modeSupportOptIn
    ? {
        className: `carbon-${modePreference}-mode`,
        "data-carbon-theme": modePreference === "dark" ? "dark" : "light",
      }
    : {};

  return (
    <StyledTokensWrapper
      data-component="tokens-wrapper"
      data-role="tokens-wrapper"
      $height={height}
      {...modeProps}
    >
      <TokensGlobalStyle />
      {children}
    </StyledTokensWrapper>
  );
};

export default TokensWrapper;
