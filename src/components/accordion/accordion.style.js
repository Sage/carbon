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
  color: var(--colorsUtilityYin090);
  background-color: ${({ scheme }) =>
    scheme === "white"
      ? "var(--colorsUtilityYang100)"
      : "var(--colorsUtilityMajorTransparent)"};
  border: 1px solid var(--colorsUtilityMajor100);
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
    border-top: 1px solid var(--colorsUtilityMajor100);
    border-bottom: 1px solid var(--colorsUtilityMajor100);
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
  margin-right: ${({ iconAlign }) =>
    iconAlign === "left" ? "var(--spacing200)" : "var(--spacing000)"};
  ${({ isExpanded, iconAlign }) => {
    return (
      !isExpanded &&
      (iconAlign === "right"
        ? "transform: rotate(90deg)"
        : "transform: rotate(-90deg)")
    );
  }};
  color: var(--colorsActionMinor500);
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
  ${({ buttonHeading, buttonWidth, iconAlign, size, hasButtonProps }) => css`
    padding: ${size === "small" ? "var(--spacing200)" : "var(--spacing300)"};
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
      outline: var(--borderWidth300) solid var(--colorsSemanticFocus500);
    }

    ${!buttonHeading &&
    css`
      &:hover {
        background-color: var(--colorsUtilityMajor050);
      }
    `}

    ${buttonHeading &&
    css`
      box-sizing: border-box;
      font-weight: 600;
      text-decoration: none;
      font-size: var(--fontSizes100);
      min-height: var(--spacing500);

      color: var(--colorsActionMajor500);

      ${!hasButtonProps &&
      css`
        ${StyledAccordionHeadingsContainer} {
          margin-left: ${iconAlign === "right" ? "64px" : "32px"};
        }
      `}

      ${StyledAccordionIcon} {
        color: var(--colorsActionMajor500);
        ${!hasButtonProps &&
        css`
          position: relative;
          ${iconAlign}: 16px;
        `}
      }

      &:hover {
        color: var(--colorsActionMajor600);
        ${StyledAccordionIcon} {
          color: var(--colorsActionMajor600);
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
  padding: var(--spacing300);
  padding-top: 0;
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
