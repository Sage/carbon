import styled, { css } from "styled-components";
import { space, SpaceProps } from "styled-system";
import { IconType } from "../icon";

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
}: Pick<ButtonProps, "disabled" | "buttonType" | "size" | "destructive"> & {
  iconOnly?: boolean;
}) {
  return css`
    ${buttonTypes(disabled, destructive)[buttonType]};

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
      font-size: var(--fontSizes200);
      min-height: 48px;
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
    ${noWrap ? "white-space: nowrap;" : "flex-flow: wrap;"}
    justify-content: center;
    vertical-align: middle;
    outline-offset: 0;
    border: 2px solid transparent;
    box-sizing: border-box;
    font-weight: 600;
    text-decoration: none;
    border-radius: var(--borderRadius400);

    &:focus {
      outline: solid 3px var(--colorsSemanticFocus500);
    }

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
