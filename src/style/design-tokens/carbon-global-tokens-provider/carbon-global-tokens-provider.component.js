import { createGlobalStyle } from "styled-components";
import generateCssVariables from "../generate-css-variables.util";

/**
 *
 * Converts theme properties to css variables form and set them globally
 *
 * @example
 * <CarbonProvider>
 *   <CarbonGlobalTokensProvider />
 *   <Button buttonType="primary">Button</Button>
 * </CarbonProvider>
 *
 */

const CarbonGlobalTokensProvider = createGlobalStyle`
  :root {
    ${(props) => generateCssVariables(props.theme)}
  }
`;

export default CarbonGlobalTokensProvider;
