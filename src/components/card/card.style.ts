import styled, { css } from "styled-components";
import { margin, MarginProps } from "styled-system";
import * as DesignTokens from "@sage/design-tokens/js/base/common";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import { CardContextProps } from "./__internal__/card.context";
import { CardProps } from "./card.component";
import addFocusStyling from "../../style/utils/add-focus-styling";

export const paddingSizes = {
  none: "var(--global-space-comp-none)",
  "extra-small": "var(--global-space-comp-s)",
  small: "var(--global-space-comp-l)",
  medium: "var(--global-space-comp-xl)",
  large: "var(--global-space-comp-2-xl)",
};

export const marginSizes = {
  none: "var(--global-space-comp-none)",
  "extra-small":
    "var(--global-size-none) calc(-1 * var(--global-space-comp-s))",
  small: "var(--global-size-none) calc(-1 * var(--global-space-comp-l))",
  medium: "var(--global-size-none) calc(-1 * var(--global-space-comp-xl))",
  large: "var(--global-size-none) calc(-1 * var(--global-space-comp-2-xl))",
};

type DesignTokensType = keyof typeof DesignTokens;
export type BoxShadowsType = Extract<DesignTokensType, `boxShadow${string}`>;

export interface StyledCardProps
  extends MarginProps,
    Pick<CardProps, "href" | "onClick"> {
  $cardWidth: string;
  $interactive: boolean;
  $draggable: boolean;
  $height?: string;
  $boxShadow?: BoxShadowsType;
  $hoverBoxShadow?: BoxShadowsType;
  $variant?: "standard" | "outlined";
  $roundness: CardContextProps["roundness"];
  $spacing: CardContextProps["spacing"];
}

const StyledCard = styled.div.attrs(applyBaseTheme)<StyledCardProps>`
  ${({
    $cardWidth,
    $interactive,
    $draggable,
    $height,
    $roundness,
    $spacing,
    $variant = "standard",
  }) => css`
    background-color: var(--container-standard-bg-default);
    border: 1px solid var(--container-standard-border-default);
    border-radius: ${$roundness === "moderate" || $roundness === "default"
      ? "var(--global-radius-container-l)"
      : "var(--global-radius-container-xl)"};
    box-shadow: ${$variant === "outlined"
      ? "var(--global-depth-none)"
      : "var(--global-depth-lvl1)"};
    color: var(--container-standard-txt-default);
    display: flex;
    flex-direction: column;
    height: ${$height};
    justify-content: space-between;
    align-items: normal;
    margin: var(--global-space-comp-xl);
    outline: none;
    transition: all 0.3s ease-in-out;
    vertical-align: top;
    width: ${$cardWidth};
    padding: var(--global-size-none) ${paddingSizes[$spacing]};
    ${margin}

    ${$interactive &&
    css`
      :hover,
      :focus-within {
        box-shadow: ${$variant === "outlined"
          ? "none"
          : "var(--global-depth-lvl2)"};
      }
    `}

    ${$draggable &&
    css`
      cursor: move;
    `}

    ::-moz-focus-inner {
      border: var(--global-size-none);
    }
  `}
`;

interface StyledCardContentProps
  extends Pick<CardContextProps, "roundness" | "spacing"> {
  $interactive?: boolean;
  href?: string;
  $hasHeader: boolean;
  $hasFooter: boolean;
  target?: string;
  rel?: string;
}

const StyledCardContent = styled.div
  .attrs(applyBaseTheme)
  .attrs(({ href, onClick }: Pick<StyledCardProps, "href" | "onClick">) => {
    if (href) {
      return { as: "a" };
    }

    if (onClick) {
      return { as: "button", role: "button", type: "button" };
    }

    return {};
  })<StyledCardContentProps>`
  ${({ $interactive }) =>
    $interactive &&
    css`
      cursor: pointer;
      display: inline-flex;
      flex-direction: column;
      height: 100%;

      :focus {
        ${addFocusStyling()};
        position: relative;
      }
    `}

  align-items: stretch;
  outline: none;
  text-decoration: none;
  background-color: inherit;
  border: none;
  padding: 0;

  ${({ spacing }) => `
    padding: ${paddingSizes[spacing]};
    margin: ${marginSizes[spacing]};
    ${spacing === "extra-small" ? "display: flex; flex-direction: column; align-items: stretch; align-self: stretch;" : ""}
  `}

  ${({ roundness, $hasHeader, $hasFooter }) => css`
    ${(roundness === "moderate" || roundness === "default") &&
    css`
      ${!$hasHeader &&
      css`
        border-top-left-radius: var(--global-radius-container-l);
        border-top-right-radius: var(--global-radius-container-l);
      `}
      ${!$hasFooter &&
      css`
        border-bottom-left-radius: var(--global-radius-container-l);
        border-bottom-right-radius: var(--global-radius-container-l);
      `}
    `}

    ${(roundness === "curved" || roundness === "large") &&
    css`
      ${!$hasHeader &&
      css`
        border-top-left-radius: var(--global-radius-container-xl);
        border-top-right-radius: var(--global-radius-container-xl);
      `}
      ${!$hasFooter &&
      css`
        border-bottom-left-radius: var(--global-radius-container-xl);
        border-bottom-right-radius: var(--global-radius-container-xl);
      `}
    `}
  `}
`;

export const StyledDragRow = styled.div<{
  spacing: CardContextProps["spacing"];
}>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: ${({ spacing }) => paddingSizes[spacing]};
`;

export { StyledCard, StyledCardContent };
