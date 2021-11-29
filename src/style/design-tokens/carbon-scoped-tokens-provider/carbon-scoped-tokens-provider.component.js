import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import generateCssVariables from "../generate-css-variables.util";
import createGuid from "../../../__internal__/utils/helpers/guid";

/**
 *
 * Converts theme properties to css variables form and set them locally for
 * given scope
 *
 */

export const tokensClassName = `sageDesignTokens-${createGuid()}`;

export const GlobalTokens = createGlobalStyle`
  .${tokensClassName} {
    ${({ theme }) => generateCssVariables(theme.compatibility)}
  }
`;

const TokensProviderWrapper = styled.div`
  margin: 0;
  padding: 0;
  width: auto;
  display: inline;
`;

const CarbonScopedTokensProvider = ({ children, theme, ...props }) => (
  <TokensProviderWrapper {...props} className={tokensClassName}>
    <GlobalTokens theme={theme} />
    {children}
  </TokensProviderWrapper>
);

export default CarbonScopedTokensProvider;
