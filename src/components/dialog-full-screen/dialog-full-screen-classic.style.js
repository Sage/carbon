import { css } from "styled-components";
import { isClassic } from "../../utils/helpers/style-helper";

export default ({ theme }) =>
  isClassic(theme) &&
  css`
    background-color: #e6ebed;
  `;
