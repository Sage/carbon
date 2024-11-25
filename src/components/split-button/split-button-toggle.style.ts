import styled, { css } from "styled-components";
import StyledButton from "../button/button.style";
import StyledIcon from "../icon/icon.style";
import baseTheme from "../../style/themes/base";

const horizontalPaddingSizes = {
  small: 5,
  medium: 10,
  large: 14,
};

type StyledSplitButtonToggleProps = {
  buttonType: "primary" | "secondary";
  disabled: boolean;
  displayed: boolean;
  size: "small" | "medium" | "large";
};

const StyledSplitButtonToggle = styled(
  StyledButton,
)<StyledSplitButtonToggleProps>`
  ${({ buttonType, disabled, displayed, size }) => css`
    border-top-left-radius: var(--borderRadius000);
    border-bottom-left-radius: var(--borderRadius000);

    ${!disabled && displayed
      ? css`
          background-color: var(--colorsActionMajor500);
          border-color: var(--colorsActionMajor500);

          &,
          ${StyledIcon} {
            color: var(--colorsActionMajorYang100);
          }

          &:focus {
            border-left-color: var(--colorsSemanticFocus500);
          }
        `
      : ""}
    ${!disabled &&
    buttonType === "primary" &&
    `
      position: relative;
      &::before {
        content: '';
        width: 2px;
        height: 100%;
        background: var(--colorsActionMajorYang100);
        position: absolute;
        left: -2px;
        z-index: 2;
      }  
    `}

    ${buttonType === "secondary" && "border-left-width: 0;"}
    padding: 0 ${horizontalPaddingSizes[size]}px;

    ${StyledButton} + & {
      margin-left: 0;
    }

    ${StyledButton} + & ${StyledIcon} {
      margin-left: 0;
    }

    &:focus {
      background-color: var(--colorsActionMajor700);
      border-color: var(--colorsActionMajor700);

      &,
      ${StyledIcon} {
        color: var(--colorsActionMajorYang100);
      }
    }
  `}
`;

StyledSplitButtonToggle.defaultProps = {
  theme: baseTheme,
};

export default StyledSplitButtonToggle;
