import styled, { css } from "styled-components";
import { space, margin } from "styled-system";

import Icon from "../icon";
import { baseTheme } from "../../style/themes";
import ValidationIconStyle from "../../__internal__/validations/validation-icon.style";

const StyledAccordionGroup = styled.div`
  ${margin}
`;

const StyledAccordionContainer = styled.div`
  ${space}
  display: flex;
  align-items: ${({ buttonHeading }) =>
    buttonHeading ? "flex-start" : "stretch"};
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
  width: ${({ width }) => width || "100%"};
  color: ${({ theme }) => theme.text.color};
  background-color: ${({ scheme, theme }) =>
    scheme === "white" ? theme.colors.white : "transparent"};
  ${({ theme }) =>
    css`
      border: 1px solid ${theme.accordion.border};
    `}
  ${({ borders }) =>
    borders === "default" &&
    css`
      border-left: none;
      border-right: none;
    `}
  ${({ borders }) =>
    borders === "none" &&
    css`
      border: none;
    `}

  & + & {
    margin-top: -1px;
    border-top: 1px solid ${({ theme }) => theme.accordion.border};
    border-bottom: 1px solid ${({ theme }) => theme.accordion.border};
  }
`;

const StyledAccordionTitle = styled.h3`
  font-size: ${({ size }) => (size === "small" ? "14" : "20")}px;
  font-weight: ${({ size }) => (size === "small" ? 700 : 900)};
  line-height: 1;
  user-select: none;
  margin: 0;
`;

const StyledAccordionSubTitle = styled.span`
  margin-top: 8px;
`;

const StyledAccordionIcon = styled(Icon)`
  transition: transform 0.3s;
  margin-right: ${({ iconAlign, theme }) =>
    iconAlign === "left" ? theme.spacing * 2 : 0}px;
  ${({ isExpanded, iconAlign }) => {
    return (
      !isExpanded &&
      (iconAlign === "right"
        ? "transform: rotate(90deg)"
        : "transform: rotate(-90deg)")
    );
  }};
`;

const StyledAccordionHeadingsContainer = styled.div`
  ${({ buttonHeading, hasValidationIcon }) =>
    !buttonHeading &&
    css`
      display: grid;
      ${hasValidationIcon &&
      css`
        grid-template-columns: min-content auto;

        ${StyledAccordionSubTitle} {
          grid-column: span 3;
        }
      `}

      ${!hasValidationIcon &&
      css`
        grid-template-rows: auto auto;
      `}

    ${ValidationIconStyle} {
        height: 20px;
        position: relative;
        top: 2px;
      }
    `}
`;

const StyledAccordionTitleContainer = styled.div`
  ${({
    buttonHeading,
    buttonWidth,
    iconAlign,
    size,
    theme,
    hasButtonProps,
  }) => css`
    padding: ${size === "small" ? theme.spacing * 2 : theme.spacing * 3}px;
    ${space}
    display: flex;
    align-items: center;
    justify-content: space-between;

    ${iconAlign === "left" &&
    css`
      justify-content: flex-end;
      flex-direction: row-reverse;
    `}

    cursor: pointer;
    z-index: 1;

    &:focus {
      outline: ${buttonHeading ? "3px" : "2px"} solid ${theme.colors.focus};
    }

    ${!buttonHeading &&
    css`
      &:hover {
        background-color: ${theme.accordion.background};
      }
    `}

    ${buttonHeading &&
    css`
      box-sizing: border-box;
      font-weight: 600;
      text-decoration: none;
      font-size: ${theme.text.size};
      min-height: ${theme.spacing * 5}px;

      color: ${theme.colors.primary};

      ${!hasButtonProps &&
      css`
        ${StyledAccordionHeadingsContainer} {
          margin-left: ${iconAlign === "right" ? "64px" : "32px"};
        }
      `}

      ${StyledAccordionIcon} {
        color: ${theme.colors.primary};
        ${!hasButtonProps &&
        css`
          position: relative;
          ${iconAlign}: 16px;
        `}
      }

      &:hover {
        color: ${theme.colors.secondary};
        ${StyledAccordionIcon} {
          color: ${theme.colors.secondary};
        }
      }

      ${buttonWidth &&
      css`
        width: ${buttonWidth}px;
      `}
    `}
  `}
`;

const StyledAccordionContentContainer = styled.div`
  flex-grow: 1;
  box-sizing: border-box;
  overflow: hidden;
  transition: all 0.3s;
  ${({ maxHeight, isExpanded }) => css`
    max-height: ${isExpanded ? `${maxHeight}px` : "0px"};
    height: ${isExpanded ? `${maxHeight}px` : "0px"};

    ${!isExpanded &&
    `
      visibility: hidden;
    `}
  `}
`;

const StyledAccordionContent = styled.div`
  padding: 0 ${({ theme }) => theme.spacing * 3}px;
  overflow: hidden;

  ${({ disableContentPadding }) =>
    disableContentPadding &&
    css`
      padding: 0;
    `}
`;

StyledAccordionGroup.defaultProps = {
  theme: baseTheme,
};
StyledAccordionContainer.defaultProps = {
  theme: baseTheme,
};
StyledAccordionTitleContainer.defaultProps = {
  theme: baseTheme,
};
StyledAccordionTitle.defaultProps = {
  theme: baseTheme,
};
StyledAccordionIcon.defaultProps = {
  theme: baseTheme,
};
StyledAccordionContent.defaultProps = {
  theme: baseTheme,
};
StyledAccordionContentContainer.defaultProps = {
  theme: baseTheme,
};

export {
  StyledAccordionGroup,
  StyledAccordionContainer,
  StyledAccordionHeadingsContainer,
  StyledAccordionSubTitle,
  StyledAccordionTitleContainer,
  StyledAccordionTitle,
  StyledAccordionIcon,
  StyledAccordionContent,
  StyledAccordionContentContainer,
};
