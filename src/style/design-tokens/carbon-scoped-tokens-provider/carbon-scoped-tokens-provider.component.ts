import styled from "styled-components";
import { baseTheme } from "../../themes";
import { ThemeObject } from "../../themes/base";
import generateCssVariables from "../generate-css-variables.util";
import { CarbonProviderProps } from "../../../components/carbon-provider";

/**
 *
 * Converts theme properties to css variables form and set them locally for
 * given scope
 *
 */

const CarbonScopedTokensProvider = styled.div<
  ThemeObject & Pick<CarbonProviderProps, "roundedCornersOptOut">
>`
  margin: 0;
  padding: 0;
  width: auto;
  display: inline;

  ${({ theme, roundedCornersOptOut }) =>
    generateCssVariables(theme.compatibility, roundedCornersOptOut)}
`;

CarbonScopedTokensProvider.defaultProps = {
  theme: baseTheme,
};

export default CarbonScopedTokensProvider;
