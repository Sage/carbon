import { css } from "styled-components";

export default (innerThickness = "3px", outerThickness = "6px") => css`
  :focus {
    outline: none;
    box-shadow: 0 0 0 ${innerThickness} var(--colorsSemanticFocus500),
      0 0 0 ${outerThickness} var(--colorsUtilityYin090);
  }
`;
