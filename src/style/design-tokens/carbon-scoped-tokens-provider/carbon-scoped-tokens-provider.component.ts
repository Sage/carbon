import { ThemeObject } from "style/themes/base";
import styled from "styled-components";
import { baseTheme } from "../../themes";
import generateCssVariables from "../generate-css-variables.util";

/**
 *
 * Converts theme properties to css variables form and set them locally for
 * given scope
 *
 */

const CarbonScopedTokensProvider = styled.div<ThemeObject>`
  margin: 0;
  padding: 0;
  width: auto;
  display: inline;

  ${({ theme }) => generateCssVariables(theme.compatibility)}
`;

CarbonScopedTokensProvider.defaultProps = {
  theme: baseTheme,
};

export default CarbonScopedTokensProvider;
