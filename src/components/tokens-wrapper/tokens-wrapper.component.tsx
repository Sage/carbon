import React from "react";
import styled from "styled-components";

import STATIC_TOKENS_CSS from "./__internal__/static-tokens";

export interface TokenWrapperProps {
  children: React.ReactNode;
  height?: string;
}

const StyledTokensWrapper = styled.div<TokenWrapperProps>`
  ${STATIC_TOKENS_CSS}
  height: ${({ height }) => height};
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
    {children}
  </StyledTokensWrapper>
);

export default TokensWrapper;
