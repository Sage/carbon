import React from "react";
import TokensWrapper, {
  TokenWrapperProps,
} from "../../src/components/tokens-wrapper";

export default ({ children, mode }: TokenWrapperProps) => (
  <TokensWrapper mode={mode}>{children}</TokensWrapper>
);
