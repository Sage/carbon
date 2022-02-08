import styled, { css } from "styled-components";
import { margin } from "styled-system";
import StyledButton from "../button/button.style";
import baseTheme from "../../style/themes/base";
import StyledIcon from "../icon/icon.style";

const StyledMultiActionButton = styled.div`
  ${margin}

  display: inline-block;
  position: relative;

  & > ${StyledButton} {
    margin: 0;

    ${StyledIcon} {
      margin-left: 0;
      left: 8px;
    }

    &:focus {
      border: 3px solid var(--colorsSemanticFocus500);
      outline: none;
      margin: -1px;
    }

    ${({ displayed }) =>
      displayed &&
      css`
        background-color: var(--colorsActionMajor700);
        border-color: var(--colorsActionMajor700);

        &,
        ${StyledIcon} {
          color: var(--colorsActionMajorYang100);
        }

        &:focus {
          border-color: var(--colorsSemanticFocus500);
          margin: 0 -1px;
        }
      `}
  }
`;

const StyledButtonChildrenContainer = styled.div`
  ${({ theme, align }) => css`
    background-color: var(--colorsActionMajorYang100);
    min-width: ${({ minWidth }) => minWidth}px;
    white-space: nowrap;
    z-index: ${theme.zIndex.popover};
    box-shadow: var(--boxShadow100);

    ${StyledIcon} {
      margin-left: 0;
      left: 8px;
    }

    ${StyledButton} {
      border: 1px solid var(--colorsActionMajorTransparent);
      color: var(--colorsActionMajor500);
      display: block;
      margin-left: 0;
      min-width: 100%;
      text-align: ${align};
      z-index: ${theme.zIndex.overlay};

      &:focus,
      &:hover {
        background-color: var(--colorsActionMajor600);
        color: var(--colorsActionMajorYang100);
      }

      & + & {
        margin-top: 3px;
      }
    }
  `}
`;

StyledButtonChildrenContainer.defaultProps = {
  theme: baseTheme,
};

StyledMultiActionButton.defaultProps = {
  theme: baseTheme,
  size: "medium",
  legacyColorVariant: "blue",
};

export { StyledButtonChildrenContainer, StyledMultiActionButton };
