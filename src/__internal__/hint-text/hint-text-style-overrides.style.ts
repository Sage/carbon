import { css } from "styled-components";

/**
 * Overrides for hint text when part of Search component
 */
const searchInverseStyles = css`
  .search.inverse & {
    color: var(--input-labelset-inverse-label-alt);
  }
`;

const hintTextStyleOverrides = css`
  ${searchInverseStyles}
`;

export default hintTextStyleOverrides;
