import React from "react";
import styled, { createGlobalStyle } from "styled-components";

import STATIC_TOKENS_CSS from "./__internal__/static-tokens";

export interface TokenWrapperProps {
  children: React.ReactNode;
  height?: string;
}

const StyledTokensWrapper = styled.div<TokenWrapperProps>`
  height: ${({ height }) => height};
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
}: TokenWrapperProps) => (
  <StyledTokensWrapper
    data-component="tokens-wrapper"
    data-role="tokens-wrapper"
    height={height}
  >
    <TokensGlobalStyle />
    {children}
  </StyledTokensWrapper>
);

export default TokensWrapper;
