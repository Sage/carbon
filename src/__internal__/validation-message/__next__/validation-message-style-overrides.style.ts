import { css } from "styled-components";

/**
 * Overrides for validation message when part of Search component
 */
const validationMessageInverseStyles = css`
  .search.inverse & {
    color: var(--input-validation-inverse-label-error);
  }
`;

const validationMessageStyleOverrides = css`
  ${validationMessageInverseStyles}
`;

export default validationMessageStyleOverrides;
