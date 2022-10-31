import styled, { css } from "styled-components";
import { space, SpaceProps } from "styled-system";
import { IconType } from "components/icon/icon-type";

import BaseTheme from "../../style/themes/base";
import buttonTypes from "./button-types.style";
import StyledIcon from "../icon/icon.style";
import { ButtonProps, SizeOptions } from "./button.component";

function additionalIconStyle(iconType?: IconType) {
  if (iconType === "services") return "6px";
  return "16px";
}

function stylingForIconOnly(size?: SizeOptions) {
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
  buttonType = "secondary",
  size,
  destructive,
  isMinor,
}: Pick<
  ButtonProps,
  "disabled" | "buttonType" | "size" | "destructive" | "isMinor"
> & {
  iconOnly?: boolean;
}) {
  return css`
    border: 2px solid transparent;
    box-sizing: border-box;
    font-weight: 600;
    text-decoration: none;
    &:focus {
      outline: solid 3px var(--colorsSemanticFocus500);
    }

    ${buttonTypes(disabled, destructive, isMinor)[buttonType]};

    ${size === "small" &&
    css`
      font-size: var(--fontSizes100);
      min-height: 32px;
    `}

    ${size === "medium" &&
    css`
      font-size: var(--fontSizes100);
      min-height: 40px;
    `}
    
    ${size === "large" &&
    css`
      font-size: 16px;
      min-height: 48px;
    `}

    /* BUTTON MINOR */
    ${isMinor &&
    size === "small" &&
    css`
      min-height: 32px;
      padding: var(--spacing000) var(--spacing100) var(--spacing000)
        var(--spacing100);
    `}

    ${isMinor &&
    size === "medium" &&
    css`
      padding-left: var(--spacing150);
      padding-right: var(--spacing150);
    `}
    
    ${isMinor &&
    size === "large" &&
    css`
      padding-left: var(--spacing200);
      padding-right: var(--spacing200);
    `}

    ${iconOnly && stylingForIconOnly(size)}
  `;
}

type StyledButtonProps = SpaceProps &
  ButtonProps & {
    iconOnly?: boolean;
  };

const StyledButton = styled.button<StyledButtonProps>`
  ${space}
  ${({ disabled, noWrap }) => css`
    align-items: center;
    cursor: ${disabled ? "not-allowed" : "pointer"};
    display: inline-flex;
    border-radius: 0;
    ${noWrap ? "white-space: nowrap;" : "flex-flow: wrap;"}
    justify-content: center;
    vertical-align: middle;
    outline-offset: 0;
    ${stylingForType}
  `}

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}

  ${({ iconOnly, iconPosition, iconType }) => css`
    ${StyledIcon} {
      margin-left: ${!iconOnly && iconPosition === "after"
        ? "var(--spacing100)"
        : "0px"};
      margin-right: ${!iconOnly && iconPosition === "before"
        ? "var(--spacing100)"
        : "0px"};
      margin-bottom: ${iconOnly ? "1px" : "0px"};
      height: ${additionalIconStyle(iconType)};
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

StyledButton.defaultProps = {
  theme: BaseTheme,
};

export default StyledButton;
