import { createGlobalStyle } from "styled-components";
import generateCssVariables from "../generate-css-variables.util";

/**
 *
 * Converts theme properties to css variables form and set them globally
 *
 */

const CarbonGlobalTokensProvider = createGlobalStyle`
  :root {
    ${(props) => generateCssVariables(props.theme)}
  }
`;

export default CarbonGlobalTokensProvider;
