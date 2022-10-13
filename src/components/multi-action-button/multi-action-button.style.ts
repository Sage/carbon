import styled, { css } from "styled-components";
import { margin } from "styled-system";
import StyledButton from "../button/button.style";
import baseTheme from "../../style/themes/base";
import StyledIcon from "../icon/icon.style";

type StyledMultiActionButtonProps = {
  displayed: boolean;
};

const StyledMultiActionButton = styled.div<StyledMultiActionButtonProps>`
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
      background-color: var(--colorsActionMajor700);
      border: 3px solid var(--colorsSemanticFocus500);
      outline: none;
      margin: 0 -1px;

      &,
      ${StyledIcon} {
        color: var(--colorsActionMajorYang100);
      }
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

type StyledButtonChildrenContainerProps = {
  align: "left" | "right";
  minWidth: number;
};

const StyledButtonChildrenContainer = styled.div<StyledButtonChildrenContainerProps>`
  ${({ theme, align, minWidth }) => css`
    background-color: var(--colorsActionMajorYang100);
    min-width: ${minWidth}px;
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
      display: flex;
      justify-content: ${align};
      margin-left: 0;
      min-width: 100%;
      text-align: ${align};
      z-index: ${theme.zIndex.overlay};

      /* Styling for Safari. Display flex is not supported on buttons in Safari. */
      @media not all and (min-resolution: 0.001dpcm) {
        @supports (-webkit-appearance: none) and (stroke-color: transparent) {
          display: -webkit-box;
        }
      }

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
};

export { StyledButtonChildrenContainer, StyledMultiActionButton };
