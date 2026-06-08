import React from "react";
import styled, { createGlobalStyle } from "styled-components";

import STATIC_TOKENS_CSS from "./__internal__/static-tokens";
import useModeSwitcher from "./__internal__/hooks/useModeSwitcher";
import {
  buildOverrideTokens,
  type BrandColors,
} from "./__internal__/utils/build-override-tokens";

export interface TokenWrapperProps {
  children: React.ReactNode;
  height?: string;
  modeSupportOptIn?: boolean;
  modeOverride?: "light" | "dark" | "auto";
  overrides?: BrandColors;
}

const StyledTokensWrapper = styled.div<{ $height?: string }>`
  height: ${({ $height }) => $height};
`;

const TokensGlobalStyle = createGlobalStyle<{
  $overrides?: TokenWrapperProps["overrides"];
}>`
  [data-component="tokens-wrapper"],
  [class*="carbon-portal"] {
    ${STATIC_TOKENS_CSS}
    ${({ $overrides }) => ($overrides ? buildOverrideTokens($overrides) : "")}
  }
`;

export const TokensWrapper = ({
  children,
  height = "auto",
  modeSupportOptIn = false,
  modeOverride,
  overrides,
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
      <TokensGlobalStyle $overrides={overrides} />
      {children}
    </StyledTokensWrapper>
  );
};

export default TokensWrapper;
