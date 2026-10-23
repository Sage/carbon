import styled, { css } from "styled-components";

import Option, { OptionProps } from "../option";

const StyledActionOption = styled(Option)<OptionProps>`
  ${({ disabled }) =>
    !disabled &&
    css`
      background-color: var(--button-typical-secondary-bg-default);
      color: var(--button-typical-secondary-label-default);

      &:hover {
        background-color: var(--button-typical-secondary-bg-hover);
        color: var(--button-typical-secondary-label-hover);
      }
    `}
`;

export default StyledActionOption;
