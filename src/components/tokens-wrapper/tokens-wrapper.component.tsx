import React, { useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";
import guid from "../../__internal__/utils/helpers/guid";
import TokensWrapperContext from "./__internal__/context";
import STATIC_TOKENS_CSS from "./__internal__/static-tokens";
import useModeSwitcher from "./__internal__/hooks/useModeSwitcher";
import {
  overrideTokens,
  type BrandOverrides,
} from "./__internal__/utils/generate-tokens-from-overrides";

export interface TokenWrapperProps {
  children: React.ReactNode;
  height?: string;
  modeSupportOptIn?: boolean;
  modeOverride?: "light" | "dark" | "auto";
  overrides?: BrandOverrides;
}

const StyledTokensWrapper = styled.div<{ $height?: string }>`
  height: ${({ $height }) => $height};
`;

const StaticTokensGlobalStyle = createGlobalStyle`
  [data-component="tokens-wrapper"],
  [data-role="carbon-portal-scoped-tokens-provider"],
  .carbon-portal-scoped-tokens-provider {
    ${STATIC_TOKENS_CSS}
  }
`;

/* istanbul ignore next */
const OverrideTokensGlobalStyle = createGlobalStyle<{
  $wrapperId: string;
  $overrides: BrandOverrides;
}>`
  ${({ $wrapperId, $overrides }) => `
    [data-component="tokens-wrapper"][data-tokens-wrapper-id="${$wrapperId}"],
    [data-role="carbon-portal-scoped-tokens-provider"][data-tokens-wrapper-id="${$wrapperId}"] {
      ${overrideTokens($overrides)}
    }
  `}
`;

export const TokensWrapper = ({
  children,
  height = "auto",
  modeSupportOptIn = false,
  modeOverride,
  overrides,
}: TokenWrapperProps) => {
  const wrapperId = useRef<string>(guid());
  const modePreference = useModeSwitcher(modeOverride);
  const { current: wrapperIdValue } = wrapperId;

  const modeProps = modeSupportOptIn
    ? {
        className: `carbon-${modePreference}-mode`,
        "data-carbon-theme": modePreference === "dark" ? "dark" : "light",
      }
    : {};

  return (
    <TokensWrapperContext.Provider
      value={{ wrapperId: overrides ? wrapperIdValue : undefined }}
    >
      <StyledTokensWrapper
        data-component="tokens-wrapper"
        data-role="tokens-wrapper"
        data-tokens-wrapper-id={overrides ? wrapperIdValue : undefined}
        $height={height}
        {...modeProps}
      >
        <StaticTokensGlobalStyle data-role="carbon-fusion-tokens" />
        {overrides && (
          <OverrideTokensGlobalStyle
            data-role="carbon-fusion-overrides"
            $wrapperId={wrapperIdValue}
            $overrides={overrides}
          />
        )}
        {children}
      </StyledTokensWrapper>
    </TokensWrapperContext.Provider>
  );
};

export default TokensWrapper;
