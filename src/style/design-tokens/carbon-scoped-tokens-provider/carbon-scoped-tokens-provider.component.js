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

const activeThemes = {};

const carbonInstanceId = createGuid();

const kebabCase = (input) =>
  input &&
  input.toString().toLowerCase().match(/\w*/gm).filter(Boolean).join("-");

export const tokensClassName = (theme) =>
  `sage-design-tokens-${kebabCase(theme)}-${carbonInstanceId}`;

export const GlobalTokens = createGlobalStyle`
  ${({ theme }) => {
    const className = tokensClassName(theme.name);
    activeThemes[className] =
      activeThemes[className] || generateCssVariables(theme.compatibility);

    return Object.entries(activeThemes).reduce(
      (acc, [name, definitions]) => `${acc} .${name} { ${definitions} }`,
      ""
    );
  }}`;

const TokensProviderWrapper = styled.div.attrs(({ theme }) => ({
  className: tokensClassName(theme.name),
}))`
  margin: 0;
  padding: 0;
  width: auto;
  display: inline;
`;

const CarbonScopedTokensProvider = ({ children }) => (
  <TokensProviderWrapper>
    <GlobalTokens />
    {children}
  </TokensProviderWrapper>
);

export default CarbonScopedTokensProvider;
