import styled, { css } from "styled-components";
import { space, SpaceProps } from "styled-system";
import { IconType } from "../icon";

import BaseTheme from "../../style/themes/base";
import buttonTypes from "./button-types.style";
import StyledIcon from "../icon/icon.style";
import { ButtonProps, SizeOptions } from "./button.component";
import addFocusStyling from "../../style/utils/add-focus-styling";

function additionalIconStyle(iconType?: IconType) {
  if (iconType === "services") return "6px";
  return "20px";
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
    min-height: ${dimension};
  `;
}

function stylingForType({
  iconOnly,
  disabled,
  buttonType,
  size,
  destructive,
}: Pick<ButtonProps, "disabled" | "size" | "destructive"> & {
  iconOnly?: boolean;
  buttonType: Required<ButtonProps>["buttonType"];
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
  Omit<ButtonProps, "buttonType"> & {
    iconOnly?: boolean;
    buttonType: Required<ButtonProps>["buttonType"];
  };

const StyledButton = styled.button<StyledButtonProps>`
  ${space}
  ${({ disabled, noWrap }) => css`
    align-items: center;
    cursor: ${disabled ? "not-allowed" : "pointer"};
    display: inline-flex;
    ${noWrap ? "white-space: nowrap" : "flex-flow: wrap"};
    justify-content: center;
    vertical-align: middle;
    outline-offset: 0;
    border: 2px solid transparent;
    box-sizing: border-box;
    font-weight: 500;
    text-decoration: none;
    border-radius: var(--borderRadius400);

    &:focus {
      ${addFocusStyling()}
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
      ${iconOnly &&
      css`
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 1px;
      `}
      ${!iconOnly &&
      css`
        margin-bottom: 0px;
        ${iconPosition === "after" &&
        `
          margin-left: var(--spacing100);
          margin-right: 0px;
        `}
        ${iconPosition === "before" &&
        css`
          margin-left: 0px;
          margin-right: var(--spacing100);
        `}
      `};

      height: ${additionalIconStyle(iconType)};
      width: 20px;
      svg {
        margin-top: 0;
      }
    }
  `}
`;

export const StyledButtonSubtext = styled.span`
  font-size: 14px;
  font-weight: 400;
  display: block;
`;

export const StyledButtonMainText = styled.span`
  display: flex;
  align-items: center;
`;
StyledButton.defaultProps = {
  theme: BaseTheme,
};

export default StyledButton;
