import { css } from "styled-components";

/**
 * Overrides for label when part of Search component
 */
const searchBaseStyles = css`
  .search & {
  }
`;

const searchInverseStyles = css`
  .search.inverse & {
    color: var(--input-labelset-inverse-label-default);
  }
`;

export const labelStyleOverrides = css`
  ${searchBaseStyles}
  ${searchInverseStyles}
`;
