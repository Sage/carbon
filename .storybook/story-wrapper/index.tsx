import React from "react";
import TokensWrapper1, {
  TokenWrapperProps,
  TokensWrapper,
} from "../../src/components/tokens-wrapper";

export default ({ children, mode }: TokenWrapperProps) => (
  <>
    <TokensWrapper1 mode={mode}>{children}</TokensWrapper1>
    <TokensWrapper>{children}</TokensWrapper>
  </>
);
