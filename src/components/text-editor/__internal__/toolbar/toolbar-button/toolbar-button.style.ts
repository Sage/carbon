import styled, { css } from "styled-components";
import { baseTheme } from "../../../../../style/themes";
import addFocusStyling from "../../../../../style/utils/add-focus-styling";

const StyledToolbarButton = styled.button.attrs({ type: "button" })<{
  isActive?: boolean;
}>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 6px;
  background-color: inherit;
  border-radius: var(--borderRadius100);
  border: none;
  cursor: pointer;

  ${({ isActive, theme }) => css`
    :focus,
    :active {
      z-index: 1;
      position: relative;

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
    }

    :hover {
      background-color: ${!isActive && "var(--colorsActionMinor200)"};
    }

    ${isActive &&
    css`
      background-color: var(--colorsActionMinor600);
    `}
  `}
`;

StyledToolbarButton.defaultProps = { theme: baseTheme };

export default StyledToolbarButton;
