import styled, { css } from "styled-components";
import StyledIcon from "../../../../icon/icon.style";
import { baseTheme } from "../../../../../style/themes";
import addFocusStyling from "../../../../../style/utils/add-focus-styling";

const StyledToolbarButton = styled.button.attrs({ type: "button" })<{
  isActive?: boolean;
}>`
  background-color: inherit;
  border-radius: var(--borderRadius050);
  border: none;
  cursor: pointer;
  width: 32px;
  font-size: 14px;
  height: 32px;

  ${StyledIcon} {
    width: auto;
  }

  ${({ isActive, theme }) => css`
    :focus,
    :active {
      z-index: 1;
      postion: relative;
      ${theme.focusRedesignOptOut &&
      /* istanbul ignore next */
      css`
        outline: 2px solid var(--colorsSemanticFocus500);
        outline-offset: -2px;
      `}

      ${!theme.focusRedesignOptOut &&
      css`
        ${addFocusStyling()}
      `}
      border-radius: var(--borderRadius050);
    }

    :hover {
      background-color: var(--colorsActionMinor200);
      border-radius: var(--borderRadius050);
    }

    ${isActive &&
    css`
      background-color: var(--colorsActionMinor200);
    `}
  `}
`;

StyledToolbarButton.defaultProps = { theme: baseTheme };

export default StyledToolbarButton;
