import styled from "styled-components";
import applyBaseTheme from "../../themes/apply-base-theme";
import type { ThemeObject } from "../../themes/theme.types";
import generateCssVariables from "../generate-css-variables.util";

/**
 *
 * Converts theme properties to css variables form and set them locally for
 * given scope
 *
 */

const CarbonScopedTokensProvider = styled.div.attrs(
  applyBaseTheme,
)<ThemeObject>`
  margin: 0;
  padding: 0;
  width: auto;
  display: inline;

  ${({ theme }) => generateCssVariables(theme.compatibility)}
`;

export default CarbonScopedTokensProvider;
