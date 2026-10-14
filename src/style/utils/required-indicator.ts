import { css } from "styled-components";

export default css`
  ::after {
    content: "*";
    display: inline-block;
    color: var(--input-labelset-label-required);
    margin-inline-start: var(--global-space-comp-xs);
  }
`;
