import styled, { css } from "styled-components";
import { space, SpaceProps } from "styled-system";
import { IconType } from "components/icon/icon-type";

import BaseTheme from "../../style/themes/base";
import buttonTypes from "./button-types.style";
import StyledIcon from "../icon/icon.style";

export type ButtonIconPosition = "before" | "after";
export type ButtonTypes =
  | "primary"
  | "secondary"
  | "tertiary"
  | "dashed"
  | "darkBackground";
export type SizeOptions = "small" | "medium" | "large";

export interface PrivateStyledButtonProps {
  iconOnly?: boolean;
}
export interface StyledButtonProps extends SpaceProps {
  /** Color variants for new business themes: "primary" | "secondary" | "tertiary" | "darkBackground" */
  buttonType?: ButtonTypes;
  /** Apply destructive style to the button */
  destructive?: boolean;
  /** Apply disabled state to the button */
  disabled?: boolean;
  /** Apply fullWidth style to the button */
  fullWidth?: boolean;
  /** Defines an Icon position related to the children: "before" | "after" */
  iconPosition?: ButtonIconPosition;
  /** Defines an Icon type within the button */
  iconType?: IconType;
  /** If provided, the text inside a button will not wrap */
  noWrap?: boolean;
  /** HTML rel attribute */
  rel?: string;
  /** Assigns a size to the button: "small" | "medium" | "large" */
  size?: SizeOptions;
  /** HTML target attribute */
  target?: string;
}

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
}: Pick<StyledButtonProps, "disabled" | "buttonType" | "size" | "destructive"> &
  PrivateStyledButtonProps) {
  return css`
    border: 2px solid transparent;
    box-sizing: border-box;
    font-weight: 600;
    text-decoration: none;
    &:focus {
      outline: solid 3px var(--colorsSemanticFocus500);
    }

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
      font-size: 16px;
      min-height: 48px;
    `}
    ${iconOnly && stylingForIconOnly(size)}
  `;
}

const StyledButton = styled.button<
  StyledButtonProps & PrivateStyledButtonProps
>`
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
