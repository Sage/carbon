import styled, { css } from "styled-components";
import { space } from "styled-system";

import Icon from "../icon";

import addFocusStyling from "../../style/utils/add-focus-styling";

export interface StyledAccordionContainerProps {
  /** Toggles left and right borders, set to none when variant is subtle */
  borders?: "default" | "full" | "none";
  /** Sets accordion width */
  width?: string;
  /** Sets accordion variant */
  variant?: "standard" | "subtle";
}

interface StyledDetailsProps {
  borders?: "default" | "full" | "none";
  isOpen: boolean;
}

interface StyledAccordionSummaryProps {
  iconAlign?: "left" | "right";
  isOpen: boolean;
  size?: "large" | "small";
  variant?: "standard" | "subtle";
  tabIndex?: number;
}

interface StyledTitleProps {
  size?: "large" | "small";
  variant?: "standard" | "subtle";
}

interface StyledAccordionContentProps {
  disableContentPadding?: boolean;
  isOpen: boolean;
  maxHeight?: string | number;
  variant?: "standard" | "subtle";
}

interface StyledIconProps {
  iconAlign?: "left" | "right";
  isOpen?: boolean;
}

export const StyledIcon = styled(Icon)<StyledIconProps>`
  transition: transform 0.3s;
  transform: rotate(0deg);
  margin-right: ${({ iconAlign }) =>
    iconAlign === "left" ? "var(--spacing200)" : "var(--spacing000)"};

  ${({ isOpen, iconAlign }) => {
    return (
      isOpen &&
      (iconAlign === "right"
        ? "transform: rotate(180deg)"
        : "transform: rotate(-180deg)")
    );
  }};

  color: var(--colorsActionMinor500);
`;
const borderColor = "var(--colorsUtilityMajor100)";

export const StyledWrapper = styled.div<StyledAccordionContainerProps>`
  color: var(--colorsUtilityYin090);
  width: ${({ width }) => width || "100%"};
  border: 1px solid ${borderColor};
  background-color: ${({ variant }) =>
    variant !== "subtle"
      ? "var(--colorsUtilityYang100)"
      : "var(--colorsUtilityMajorTransparent)"};
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
`;

export const StyledDetails = styled.details<StyledDetailsProps>`
  max-width: 100%;
  ${({ isOpen }) =>
    isOpen &&
    css`
      border-bottom: none;
    `}
  & summary {
    list-style: none;
  }

  & summary::-webkit-details-marker {
    display: none;
  }

  & summary::marker {
    display: none;
  }
`;

export const StyledSummaryContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledSummaryTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const StyledSubtitle = styled.span`
  margin-top: var(--spacing100);
  font-weight: normal;
`;

export const StyledSummary = styled.summary<StyledAccordionSummaryProps>`
  ${({ iconAlign, size, isOpen, variant }) => css`
    cursor: pointer;
    user-select: none;
    padding: ${size === "small" ? "var(--spacing200)" : "var(--spacing300)"};

    ${space}
    font-weight: bold;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;

    ${iconAlign &&
    iconAlign === "left" &&
    css`
      flex-direction: row-reverse;
      justify-content: flex-end;
    `}

    &:focus {
      ${addFocusStyling()}
    }

    ${variant === "subtle" &&
    css`
      color: var(--colorsActionMajor500);
      padding: var(--spacing025);
      margin-bottom: ${isOpen && "var(--spacing200)"};
      width: fit-content;

      ${StyledIcon} {
        color: var(--colorsActionMajor500);
        ${iconAlign === "left" && "margin-right: var(--spacing050)"};
      }

      :hover {
        color: var(--colorsActionMajor600);
        ${StyledIcon} {
          color: var(--colorsActionMajor600);
        }
      }
    `}

    ${variant !== "subtle" &&
    css`
      &:hover {
        background-color: var(--colorsUtilityMajor050);
      }
    `}

    &::marker,
    &::-webkit-details-marker {
      display: none;
    }
  `}
`;

export const StyledTitle = styled.h3<StyledTitleProps>`
  font-size: ${({ size, variant }) =>
    size === "small" || variant === "subtle"
      ? "var(--fontSizes200)"
      : "var(--fontSizes400)"};
  font-weight: 500;
  line-height: 1;
  user-select: none;
  margin: 0;
`;

export const StyledContent = styled.div<StyledAccordionContentProps>`
  box-sizing: border-box;

  ${({ variant }) =>
    variant === "subtle" &&
    css`
      margin-left: var(--spacing150);
      padding: var(--spacing100) var(--spacing200) var(--spacing300);
      border-left: 2px solid var(--colorsUtilityMajor100);
    `}

  ${({ maxHeight, isOpen }) => css`
    max-height: ${isOpen ? `${maxHeight}px` : "0px"};
    height: ${isOpen ? `${maxHeight}px` : "0px"};

    ${!isOpen && `visibility: hidden;`}
  `}
  overflow: hidden;
  padding: ${({ isOpen }) =>
    isOpen ? "var(--spacing200)" : "0 var(--spacing200)"};

  ${({ disableContentPadding }) =>
    disableContentPadding &&
    css`
      padding: 0;
    `}

  transition: all 0.3s;
`;
