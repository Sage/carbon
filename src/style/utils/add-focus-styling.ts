import { css } from "styled-components";

export default (innerThickness = "2px", outerThickness = "4px") => css`
  outline: none;
  box-shadow: 0 0 0 ${innerThickness} var(--colorsSemanticFocus500),
    0 0 0 ${outerThickness} var(--colorsUtilityYin090);
`;
