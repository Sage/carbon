import styled, { css } from "styled-components";
import { space } from "styled-system";
import PropTypes from "prop-types";
import propTypes from "@styled-system/prop-types";

import BaseTheme from "../../style/themes/base";
import buttonTypes from "./button-types.style";
import StyledIcon from "../icon/icon.style";
import {
  BUTTON_ICON_POSITIONS,
  BUTTON_SIZES,
  BUTTON_VARIANTS,
} from "./button.config";
import { ICONS } from "../icon/icon-config";

const StyledButton = styled.button`
  ${space}
  ${({ disabled, noWrap }) => css`
    align-items: center;
    cursor: ${disabled ? "not-allowed" : "pointer"};
    display: inline-flex;
    flex-direction: column;
    flex-flow: wrap;
    border-radius: 0;

    ${noWrap &&
    css`
      white-space: nowrap;
    `}
    justify-content: center;
    vertical-align: middle;
    outline-offset: 0;
    ${stylingForType}
  `}

  &&& {
    ${({ mb, theme }) =>
      (mb || mb === 0) &&
      css`
        margin-bottom: ${mb * theme.spacing}px;
      `}
  }

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}

  ${({ iconOnly, iconPosition, theme }) => css`
    ${StyledIcon} {
      margin-left: ${!iconOnly && iconPosition === "after"
        ? `${theme.spacing}px`
        : "0px"};
      margin-right: ${!iconOnly && iconPosition === "before"
        ? `${theme.spacing}px`
        : "0px"};
      margin-bottom: ${iconOnly ? "1px" : "0px"};
      height: ${additionalIconStyle};
      svg {
        margin-top: 0;
      }
      ${iconOnly && "margin-left: auto; margin-right: auto"}
    }
  `}
`;

export const StyledButtonSubtext = styled.span`
  font-size: 14px;
  font-weight: 400;
  display: block;
`;

function additionalIconStyle({ iconType }) {
  if (iconType === "services") return "6px";
  return "16px";
}

function stylingForIconOnly(size) {
  let dimension = "";
  switch (size) {
    case "small":
      dimension = "32px";
      break;
    case "large":
      dimension = "48px";
      break;
    default:
      dimension = "40px";
  }
  return `
  padding: 0px; 
  width: ${dimension}; 
  min-height: ${dimension}`;
}

function stylingForType({
  iconOnly,
  disabled,
  buttonType,
  theme,
  size,
  destructive,
}) {
  return css`
    border: 2px solid transparent;
    box-sizing: border-box;
    font-weight: 600;
    text-decoration: none;
    &:focus {
      outline: solid 3px ${theme.colors.focus};
    }

    ${buttonTypes(theme, disabled, destructive)[buttonType]};

    ${size === "small" &&
    css`
      font-size: ${theme.text.size};
      min-height: 32px;
    `}

    ${size === "medium" &&
    css`
      font-size: ${theme.text.size};
      min-height: 40px;
    `}
    
    ${size === "large" &&
    css`
      font-size: 16px;
      min-height: 48px;
    `}
    ${iconOnly && stylingForIconOnly(size)}
  `;
}

StyledButton.defaultProps = {
  theme: BaseTheme,
  medium: true,
  buttonType: "secondary",
};

StyledButton.propTypes = {
  /** Styled system spacing props */
  ...propTypes.space,
  /** Button types for new business themes */
  buttonType: PropTypes.oneOf(BUTTON_VARIANTS),
  /** The text the button displays */
  children: PropTypes.node.isRequired,
  /** Apply disabled state to the button */
  disabled: PropTypes.bool,
  /** Defines an Icon position within the button */
  iconPosition: PropTypes.oneOf([...BUTTON_ICON_POSITIONS, ""]),
  /** Defines an Icon type within the button (see Icon for options) */
  iconType: PropTypes.oneOf([...ICONS, ""]),
  /** Assigns a size to the button */
  size: PropTypes.oneOf(BUTTON_SIZES),
  /** Second text child, renders under main text, only when size is "large" */
  subtext: PropTypes.string,
};

export default StyledButton;
