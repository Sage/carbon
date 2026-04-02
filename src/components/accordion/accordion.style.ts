import styled, { css } from "styled-components";

import { space, margin } from "styled-system";

import Icon from "../icon";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import addFocusStyling from "../../style/utils/add-focus-styling";

const sizeMap = {
  small: {
    titleFont: "var(--global-font-static-section-heading-s)",
    subtitleFont: "var(--global-font-static-comp-medium-s)",
    headingPadding: "var(--global-space-comp-l)",
  },
  medium: {
    titleFont: "var(--global-font-static-section-heading-m)",
    subtitleFont: "var(--global-font-static-comp-medium-l)",
    headingPadding: "var(--global-space-comp-xl)",
  },
};

interface StyledAccordionProps {
  $borders?: "default" | "full" | "none";
  $width?: string;
  $variant?: "standard" | "simple";
  $isExpanded?: boolean;
  $allowMotion?: boolean;
  // only used to set standard variant styles
  $size?: "small" | "medium";
  $iconAlign?: "left" | "right";
  $height?: string | number;
}

export const StyledAccordionGroup = styled.div.attrs(applyBaseTheme)`
  ${margin}
`;

export const StyledAccordionContainer = styled.div.attrs(
  applyBaseTheme,
)<StyledAccordionProps>`
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
  width: ${({ $width }) => $width || "100%"};

  ${({ $variant, $borders, $isExpanded, $allowMotion }) => css`
    ${$variant === "standard" &&
    css`
      & + & {
        margin-top: -1px;
      }

      border: 1px solid var(--container-action-border-default);
      ${$borders === "default" &&
      css`
        border-left: none;
        border-right: none;
      `};

      ${$borders === "none" &&
      css`
        border: none;
      `};
    `}

    ${$variant === "simple" &&
    css`
      gap: ${$isExpanded ? "var(--global-space-comp-l)" : "0px"};

      ${$allowMotion &&
      css`
        transition: gap 0.4s;
      `}
    `}
  `}

  && {
    ${space}
  }
`;

export const StyledAccordionTitle = styled.h3<StyledAccordionProps>`
  ${({ $size }) =>
    $size &&
    css`
      font: ${sizeMap[$size].titleFont};
    `}

  color: var(--container-action-txt-default);
  margin: 0;
`;

export const StyledAccordionSubTitle = styled.span<StyledAccordionProps>`
  ${({ $size }) =>
    $size &&
    css`
      font: ${sizeMap[$size].subtitleFont};
    `}

  color: var(--container-action-txt-alt-default);
`;

export const StyledAccordionIcon = styled(Icon)<StyledAccordionProps>`
  width: var(--global-size-2-xs);
  height: var(--global-size-2-xs);
  color: var(--container-action-icon-default);

  ${({ $isExpanded, $allowMotion }) => css`
    transform: rotate(0deg);

    ${$isExpanded &&
    css`
      transform: rotate(-180deg);
    `}
    ${$allowMotion &&
    css`
      transition: transform 0.4s;
    `}
  `};
`;

export const StyledAccordionTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--global-space-comp-xs);
  flex: 1 0 0;
`;

export const StyledAccordionTitleContainer = styled.div.attrs(
  applyBaseTheme,
)<StyledAccordionProps>`
  ${({ $size, $iconAlign }) =>
    $size &&
    css`
      display: flex;
      flex: 1 0 0;
      align-items: center;
      align-self: stretch;
      background-color: transparent;
      border: none;
      text-align: left;
      gap: var(--global-space-comp-l);
      padding: ${sizeMap[$size].headingPadding};

      ${$iconAlign === "right" &&
      css`
        flex-direction: row-reverse;
      `}

      ${space}

    &:focus {
        ${addFocusStyling()}
        z-index: 1;
      }
    `}
`;

export const StyledAccordionLine = styled.div`
  position: absolute;
  width: 2px;
  background-color: var(--input-typical-border-alt);
  border-radius: var(--global-radius-action-xs);
  height: 100%;
`;

export const StyledAccordionContentContainer = styled.div<StyledAccordionProps>`
  position: relative;
  overflow: hidden;
  height: 0;
  opacity: 0;

  ${({ $height, $isExpanded, $allowMotion }) => css`
    ${$allowMotion &&
    css`
      transition:
        height 0.4s,
        opacity 0.2s;
    `}

    ${$isExpanded &&
    css`
      height: ${$height}px;
      opacity: 1;
    `}
  `}
`;

export const StyledAccordionContent = styled.div<StyledAccordionProps>`
  ${({ $variant }) => css`
    overflow: hidden;

    ${$variant === "simple" &&
    css`
      margin-left: var(--global-space-comp-l);
    `}
  `}
`;
