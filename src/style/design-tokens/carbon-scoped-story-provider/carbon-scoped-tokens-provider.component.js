import styled from "styled-components";
import generateCssVariables from "../generate-css-variables.util";

/**
 *
 * Converts theme properties to css variables form and set them locally for
 * given scope
 *
 */

const CarbonScopedTokensProvider = styled.div`
  margin: 0;
  padding: 0;
  width: auto;
  display: inline;
  ${({ theme }) => generateCssVariables(theme)}
`;

export default CarbonScopedTokensProvider;
