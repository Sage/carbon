import { css } from "styled-components";

/**
 * Overrides for label when part of Search component
 */
const searchInverseStyles = css`
  .search.inverse & {
    color: var(--input-labelset-inverse-label-default);
  }
`;

const labelStyleOverrides = css`
  ${searchInverseStyles}
`;

export default labelStyleOverrides;
