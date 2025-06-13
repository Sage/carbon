import { css, SimpleInterpolation } from "styled-components";

export default (hide: boolean, baseStyles: SimpleInterpolation) => css`
  ${baseStyles}

  ${hide &&
  `
    & {
      visibility: hidden;
    }
  `}
`;
