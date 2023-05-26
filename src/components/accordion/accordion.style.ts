import styled, { css } from "styled-components";
import { space, margin } from "styled-system";

import Icon from "../icon";
import { baseTheme } from "../../style/themes";
import ValidationIconStyle from "../../__internal__/validations/validation-icon.style";
import addFocusStyling from "../../style/utils/add-focus-styling";

const StyledAccordionGroup = styled.div`
  ${margin}
`;

export interface StyledAccordionContainerProps {
  /** Toggles left and right borders */
  borders?: "default" | "full" | "none";
  /** Renders the accordion heading in the style of a tertiary button */
  buttonHeading?: boolean;
  /** Sets background as white or transparent */
  scheme?: "white" | "transparent";
  /** Sets accordion width */
  width?: string;
}

const StyledAccordionContainer = styled.div<StyledAccordionContainerProps>`
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

interface StyledAccordionTitleProps {
  size?: "large" | "small";
}

const StyledAccordionTitle = styled.h3<StyledAccordionTitleProps>`
  font-size: ${({ size }) => (size === "small" ? "14" : "20")}px;
  font-weight: ${({ size }) => (size === "small" ? 700 : 900)};
  line-height: 1;
  user-select: none;
  margin: 0;
`;

const StyledAccordionSubTitle = styled.span`
  margin-top: 8px;
`;

interface StyledAccordionIconProps {
  isExpanded?: boolean;
  iconAlign?: "left" | "right";
}

const StyledAccordionIcon = styled(Icon)<StyledAccordionIconProps>`
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

interface StyledAccordionHeadingsContainerProps {
  buttonHeading?: boolean;
  hasValidationIcon?: boolean;
}

const StyledAccordionHeadingsContainer = styled.div<StyledAccordionHeadingsContainerProps>`
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

interface StyledAccordionTitleContainerProps {
  buttonHeading?: boolean;
  buttonWidth?: number | string;
  hasButtonProps?: boolean;
  iconAlign?: "left" | "right";
  size?: "large" | "small";
}

const oldFocusStyling = `
  &:focus {
    outline: solid 3px var(--colorsSemanticFocus500);
  }
`;

const StyledAccordionTitleContainer = styled.div<StyledAccordionTitleContainerProps>`
  ${({
    buttonHeading,
    buttonWidth,
    iconAlign,
    size,
    hasButtonProps,
    theme,
  }) => css`
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
      ${theme.focusRedesignOptOut ? oldFocusStyling : addFocusStyling()}
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
          margin-left: ${iconAlign === "right"
            ? "var(--spacing300)"
            : "var(--spacing100)"};
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
        width: ${typeof buttonWidth === "number"
          ? `${buttonWidth}px`
          : buttonWidth};
      `}
    `}
  `}
`;

export interface StyledAccordionContentContainerProps {
  isExpanded?: boolean;
  maxHeight?: string | number;
}

const StyledAccordionContentContainer = styled.div<StyledAccordionContentContainerProps>`
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

export interface StyledAccordionContentProps {
  disableContentPadding?: boolean;
}

const StyledAccordionContent = styled.div<StyledAccordionContentProps>`
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
