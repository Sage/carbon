import styled, { css } from "styled-components";
import { space, margin, MarginProps } from "styled-system";

import Box from "../box";
import Icon from "../icon";
import addFocusStyling from "../../style/utils/add-focus-styling";
import { baseTheme } from "../../style/themes";
import { AccordionProps } from "./accordion.component";

interface StyledWrapperProps
  extends Pick<
      AccordionProps,
      | "borders"
      | "expanded"
      | "headerSpacing"
      | "size"
      | "subTitle"
      | "variant"
      | "width"
    >,
    MarginProps {}

interface StyledDetailsProps {
  disableContentPadding?: boolean;
  iconAlign?: "left" | "right";
  reduceMotion?: boolean;
  size?: "large" | "small";
  variant?: "standard" | "subtle";
}
interface StyledSummaryTitleProps {
  size?: "large" | "small";
  variant?: "standard" | "subtle";
}
export interface StyledContentProps {
  expanded?: boolean;
  reduceMotion?: boolean;
  variant?: "standard" | "subtle";
  width?: string;
}
interface StyledIconProps {
  variant?: "standard" | "subtle";
}

const calculatePadding = (
  size?: string,
  variant?: string,
  subtleToken = "var(--spacing025)",
) => {
  if (size && size === "small") {
    return "var(--spacing200)";
  }
  if (variant && variant === "subtle") {
    return subtleToken;
  }
  return "var(--spacing300)";
};

const getMaxHeight = (
  expanded?: boolean,
  headerSpacing?: boolean,
  size?: string,
  subtitle?: string,
) => {
  if (expanded || headerSpacing) {
    return "auto";
  }

  if (subtitle) return "97px";

  return size === "small" ? "56px" : "72px";
};

const StyledWrapper = styled.div<StyledWrapperProps>`
  ${margin}

  border: 1px solid var(--colorsActionMinor100);
  width: ${({ width }) => width || "100%"};
  max-height: ${({ expanded, headerSpacing, size, subTitle }) =>
    getMaxHeight(expanded, !!headerSpacing, size, subTitle)};

  color: var(--colorsUtilityYin090);
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

    ${({ variant }) =>
    variant !== "subtle" &&
    css`
      & + & {
        margin-top: -1px;
        border-top: 1px solid var(--colorsUtilityMajor100);
        border-bottom: 1px solid var(--colorsUtilityMajor100);
      }
    `}
`;

const StyledDetails = styled.details<StyledDetailsProps>`
  overflow: hidden;

  &:active,
  &:focus {
    ${addFocusStyling()}
  }

  &[open] + div.content {
    max-height: 800px;
    padding-top: ${({ disableContentPadding, size, variant }) =>
      disableContentPadding
        ? "0"
        : calculatePadding(size, variant, "var(--spacing100)")};
    padding-bottom: ${({ disableContentPadding, size }) =>
      disableContentPadding
        ? "0"
        : calculatePadding(size, undefined, "var(--spacing100)")};
    padding-left: ${({ disableContentPadding, size }) =>
      disableContentPadding
        ? "0"
        : calculatePadding(size, undefined, "var(--spacing100)")};
    padding-right: ${({ disableContentPadding, size }) =>
      disableContentPadding
        ? "0"
        : calculatePadding(size, undefined, "var(--spacing100)")};

    &:active,
    &:focus {
      ${addFocusStyling()}
    }
  }

  span[data-element="accordion-marker"] {
    rotate: 0deg;
    /* istanbul ignore next */
    transition: rotate ${({ reduceMotion }) => (reduceMotion ? 0 : "200ms")}
      ease-in;
  }

  &[open] span[data-element="accordion-marker"] {
    rotate: ${({ iconAlign }) =>
      iconAlign === "right" ? "180deg" : "-180deg"};
    /* istanbul ignore next */
    transition: rotate ${({ reduceMotion }) => (reduceMotion ? 0 : "200ms")}
      ease-out;
  }
`;

const StyledSummary = styled.summary`
  ${space}
  cursor: pointer;
  list-style: none;
  user-select: none;
  ::-webkit-details-marker {
    display: none;
  }
  ::marker {
    display: none;
  }
`;

const StyledSummaryTitleWrapper = styled(Box)<StyledSummaryTitleProps>`
  ${({ size, variant }) => css`
    padding: ${calculatePadding(size, variant)};

    ${variant !== "subtle" &&
    css`
      &:hover {
        background-color: var(--colorsUtilityMajor050);
      }
    `};
  `}
`;

const StyledSummaryTitle = styled.h3<StyledSummaryTitleProps>`
  font-size: ${({ size, variant }) =>
    size === "small" || variant === "subtle"
      ? "var(--fontSizes200)"
      : "var(--fontSizes400)"};
  font-weight: 500;
  line-height: 1;
  user-select: none;
  margin: 0;
`;

const StyledContent = styled.div<StyledContentProps>`
  max-width: ${({ width }) => width || "100%"};
  box-sizing: border-box;
  padding-top: 0;
  padding-bottom: 0;
  max-height: 0;
  overflow: hidden;
  border: 2px solid transparent;

  ${({ expanded, variant }) =>
    variant === "subtle" &&
    expanded &&
    css`
      border-left: 2px solid var(--colorsUtilityMajor100);
      margin-left: var(--spacing150);
      margin-top: var(--spacing200);
      padding: var(--spacing100) var(--spacing200) var(--spacing300);
    `}
`;

const StyledIcon = styled(Icon)<StyledIconProps>`
  ${({ variant }) =>
    variant === "subtle" &&
    css`
      color: var(--colorsActionMajor500);
    `}
`;

StyledWrapper.defaultProps = {
  theme: baseTheme,
};

export {
  StyledContent,
  StyledDetails,
  StyledIcon,
  StyledSummary,
  StyledSummaryTitle,
  StyledSummaryTitleWrapper,
  StyledWrapper,
};
