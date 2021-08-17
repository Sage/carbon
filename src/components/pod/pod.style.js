import styled, { css } from "styled-components";
import { margin } from "styled-system";

import { baseTheme } from "../../style/themes";
import Link from "../link";
import { StyledContent as StyledLinkContent } from "../link/link.style";
import IconButton from "../icon-button";
import StyledIcon from "../icon/icon.style";

const StyledPod = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  text-align: ${({ alignTitle }) => alignTitle};
  ${({ internalEditButton }) => internalEditButton && "position: relative"};
  ${margin}
  ${({ height }) => height && `height: ${height}`};

  &:focus {
    outline: none;
  }
`;

const blockBackgrounds = (variant, theme) =>
  ({
    primary: theme.colors.white,
    secondary: theme.pod.secondaryBackground,
    tertiary: theme.pod.tertiaryBackground,
    transparent: "transparent",
    tile: theme.colors.white,
  }[variant]);

const StyledBlock = styled.div`
  ${({
    theme,
    variant,
    softDelete,
    noBorder,
    hasButtons,
    contentTriggersEdit,
    fullWidth,
    internalEditButton,
    isHovered,
    isFocused,
  }) =>
    css`
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      background-color: ${blockBackgrounds(variant, theme)};
      width: 100%;
      height: 100%;

      ${variant === "tile" && "box-shadow: 0 2px 3px 0 rgba(2, 18, 36, 0.2)"};

      ${noBorder ? "border: none" : `border: 1px solid ${theme.pod.border}`};

      ${hasButtons && !(fullWidth || internalEditButton) && "width: auto;"};

      ${contentTriggersEdit && "cursor: pointer"};

      ${(isHovered || isFocused) &&
      css`
        background-color: ${theme.pod.hoverBackground};

        ${internalEditButton &&
        variant === "tile" &&
        "background-color: transparent;"}

        ${contentTriggersEdit &&
        css`
          background-color: ${theme.colors.secondary};
          * {
            color: ${theme.colors.white};
          }
        `}
      `}

      ${isFocused &&
      (!internalEditButton || contentTriggersEdit) &&
      css`
        outline: 3px solid ${theme.colors.focus};
        border: none;
        ${noBorder ? "" : "padding: 1px"};
      `};

      ${!isFocused &&
      (!internalEditButton || contentTriggersEdit) &&
      css`
        outline: none;
      `};

      ${softDelete &&
      css`
        color: ${theme.pod.softDeleteText};
        background-color: ${theme.pod.tertiaryBackground};
      `};
    `}
`;

const contentPaddings = {
  "extra-small": "8px",
  small: "8px",
  medium: "16px",
  large: "32px 24px",
  "extra-large": "40px",
};

const StyledContent = styled.div`
  text-align: left;
  padding: ${({ size }) => contentPaddings[size]};
  flex-grow: 1;
`;

const footerPaddings = {
  "extra-small": "8px",
  small: "8px",
  medium: "8px 16px",
  large: "16px 24px",
  "extra-large": "24px 40px",
};

const StyledFooter = styled.div`
  ${({ theme, variant, size, softDelete }) => css`
    background-color: ${theme.pod.footerBackground};
    box-shadow: inset 0px 1px 1px 0 rgba(0, 0, 0, 0.1);
    color: ${theme.text.color};
    padding: ${footerPaddings[size]};

    ${softDelete &&
    css`
      color: ${theme.pod.softDeleteText};
    `}

    ${variant === "tile" &&
    css`
      border-top: 1px solid ${theme.pod.border};
    `};
  `}
`;
const StyledActionsContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${({ internalEditButton }) =>
    internalEditButton &&
    css`
      position: absolute;
      right: 2px;
      top: 2px;
      z-index: 10;
    `}
`;

const actionButtonPaddings = {
  "extra-small": 8,
  small: 8,
  medium: 16,
  large: 16,
  "extra-large": 16,
};

const actionButtonBackgrounds = (variant, theme) =>
  ({
    primary: theme.colors.white,
    secondary: theme.pod.secondaryBackground,
    tertiary: theme.pod.tertiaryBackground,
    transparent: "transparent",
    tile: theme.colors.white,
  }[variant]);

const getButtonStyles = ({
  theme,
  size,
  variant,
  noBorder,
  isFocused,
  isHovered,
  internalEditButton,
  iconColor,
  hoverBackgroundColor,
}) => css`
  cursor: pointer;
  background-color: ${actionButtonBackgrounds(variant, theme)};
  border: 1px solid ${theme.pod.border};
  margin-left: 8px;
  margin-bottom: 8px;
  box-sizing: content-box;
  width: 16px;
  height: 16px;
  padding: ${actionButtonPaddings[size]}px;

  ${StyledIcon} {
    top: -2px;
    height: 16px;
    width: 16px;
    color: ${iconColor};
  }

  ${noBorder && "border: none;"}

  ${internalEditButton &&
  css`
    border: none;
    background: transparent;
  `}
    
  ${(isHovered || isFocused) &&
  !internalEditButton &&
  css`
    background-color: ${hoverBackgroundColor};
    color: ${theme.colors.white};

    ${StyledIcon} {
      color: ${theme.colors.white};
    }
  `}
  
  ${isFocused &&
  css`
    outline: 3px solid ${theme.colors.focus};
    border: none;
    padding: ${actionButtonPaddings[size] +
    (noBorder || internalEditButton ? 0 : 1)}px;
  `};
`;

const StyledEditAction = styled(Link)`
  && > a,
  && button {
    ${({ displayOnlyOnHover, isHovered, isFocused }) =>
      displayOnlyOnHover && !(isHovered || isFocused) && "display: none;"}

    ${(props) =>
      getButtonStyles({
        ...props,
        iconColor: props.theme.colors.primary,
        hoverBackgroundColor: props.theme.colors.secondary,
      })}
  }

  ${StyledLinkContent} {
    clip: rect(1px, 1px, 1px, 1px);
    position: absolute;
  }
`;

const StyledDeleteButton = styled(IconButton)`
  && {
    ${({ displayOnlyOnHover }) => displayOnlyOnHover && "display: none;"}
    ${(props) =>
      getButtonStyles({
        ...props,
        iconColor: props.theme.colors.error,
        hoverBackgroundColor: props.theme.colors.destructive.hover,
      })}
  }
`;

const StyledUndoButton = styled(IconButton)`
  && {
    ${({ displayOnlyOnHover, isHovered, isFocused }) =>
      displayOnlyOnHover && !(isHovered || isFocused) && "display: none;"}
    ${(props) =>
      getButtonStyles({
        ...props,
        iconColor: props.theme.colors.primary,
        hoverBackgroundColor: props.theme.colors.secondary,
      })}
  }
`;

const headerRightAlignMargins = {
  "extra-small": 20,
  small: 25,
  medium: 30,
  large: 30,
  "extra-large": 30,
};

const StyledHeader = styled.div`
  ${({ alignTitle, internalEditButton, size }) => css`
    margin-bottom: 24px;
    text-align: ${alignTitle};

    ${alignTitle === "right" &&
    internalEditButton &&
    css`
      margin-right: ${headerRightAlignMargins[size]}px;
    `};
  `}
`;

const StyledSubtitle = styled.h5`
  margin-top: 8px;
  font-size: 14px;
  font-weight: normal;
`;

const StyledTitle = styled.h4`
  display: inline;
  font-size: 18px;
  font-weight: 600;
`;

StyledBlock.defaultProps = {
  theme: baseTheme,
};
StyledContent.defaultProps = {
  theme: baseTheme,
};
StyledEditAction.defaultProps = {
  theme: baseTheme,
};
StyledDeleteButton.defaultProps = {
  theme: baseTheme,
};
StyledUndoButton.defaultProps = {
  theme: baseTheme,
};
StyledActionsContainer.defaultProps = {
  theme: baseTheme,
};
StyledFooter.defaultProps = {
  theme: baseTheme,
};
StyledPod.defaultProps = {
  theme: baseTheme,
};
StyledHeader.defaultProps = {
  theme: baseTheme,
};
StyledSubtitle.defaultProps = {
  theme: baseTheme,
};
StyledTitle.defaultProps = {
  theme: baseTheme,
};

export {
  StyledBlock,
  StyledContent,
  StyledEditAction,
  StyledActionsContainer,
  StyledDeleteButton,
  StyledUndoButton,
  StyledFooter,
  StyledPod,
  StyledHeader,
  StyledSubtitle,
  StyledTitle,
};
