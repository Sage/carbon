import { css } from "styled-components";
import { isClassic } from "../../utils/helpers/style-helper";

export default ({ theme }) =>
  isClassic(theme) &&
  css`
    &:focus {
      outline: -webkit-focus-ring-color auto 5px;
    }
  `;
