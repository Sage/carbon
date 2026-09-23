import styled, { css } from "styled-components";
import { layout, flexbox } from "styled-system";

interface StyledMenuProps {
  $inFullscreenView?: boolean;
}

export const StyledMenuWrapper = styled.ul<StyledMenuProps>`
  list-style: none;
  margin: 0;
  padding: 0;
  outline: none;
  display: flex;
  align-items: stretch;
  min-height: var(--global-size-m);

  ${layout}
  ${flexbox}

  ${({ $inFullscreenView }) =>
    $inFullscreenView &&
    css`
      flex-direction: column;
    `}
`;

export default StyledMenuWrapper;
