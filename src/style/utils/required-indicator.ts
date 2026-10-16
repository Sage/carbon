import { css } from "styled-components";

export default (font: string) => css`
  ::after {
    content: "*";
    display: inline-block;
    color: var(--input-labelset-label-required);
    font: ${font};
    margin-inline-start: var(--global-space-comp-xs);
  }
`;
