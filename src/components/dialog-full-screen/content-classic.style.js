import { css } from "styled-components";
import { isClassic } from "../../utils/helpers/style-helper";

export default ({ theme, hasHeader }) =>
  isClassic(theme) &&
  css`
    padding-top: 30px;
    padding-bottom: 30px;

    .carbon-app-wrapper {
      max-width: 1600px;
      padding: 0 40px;
    }

    ${!hasHeader &&
    `
    padding-top: 0;
    margin-top: 0;

    .carbon-app-wrapper {
      max-width: 100%;
      padding: 0;
      height: 106px;
    }
  `}
  `;
