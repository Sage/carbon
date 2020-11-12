import { css } from "styled-components";
import { isClassic } from "../../../../utils/helpers/style-helper";

export default ({ theme }) =>
  isClassic(theme) &&
  css`
    border: 1px solid transparent;
    ${({ color }) =>
      (color === "transparent" || color === "none") &&
      css`
        border-color: #b3c2c8;
      `}
  `;
