import styled, { css } from "styled-components";
import { margin, MarginProps } from "styled-system";
import * as DesignTokens from "@sage/design-tokens/js/base/common";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import { CardContextProps } from "./__internal__/card.context";
import { CardProps } from "./card.component";
import addFocusStyling from "../../style/utils/add-focus-styling";

const paddingSizes = {
  small: "0 var(--spacing300)",
  medium: "0 var(--spacing400)",
  large: "0 var(--spacing600)",
};

const marginSizes = {
  small: "0 -24px",
  medium: "0 -32px",
  large: "0 -48px",
};

type DesignTokensType = keyof typeof DesignTokens;
export type BoxShadowsType = Extract<DesignTokensType, `boxShadow${string}`>;

export interface StyledCardProps
  extends MarginProps,
    Pick<CardContextProps, "roundness" | "spacing">,
    Pick<CardProps, "href" | "onClick"> {
  cardWidth: string;
  interactive: boolean;
  draggable: boolean;
  height?: string;
  boxShadow?: BoxShadowsType;
  hoverBoxShadow?: BoxShadowsType;
}

const StyledCard = styled.div.attrs(applyBaseTheme)<StyledCardProps>`
  ${({
    cardWidth,
    interactive,
    draggable,
    height,
    spacing,
    boxShadow = "boxShadow050",
    hoverBoxShadow = "boxShadow100",
    roundness,
  }) => css`
    background-color: var(--colorsUtilityYang100);
    border: none;
    border-radius: ${roundness === "default"
      ? "var(--borderRadius100)"
      : "var(--borderRadius200)"};
    box-shadow: var(--${boxShadow});
    color: var(--colorsUtilityYin090);
    display: flex;
    flex-direction: column;
    height: ${height};
    justify-content: space-between;
    align-items: normal;
    margin: 25px;
    outline: none;
    padding: ${paddingSizes[spacing]};
    transition: all 0.3s ease-in-out;
    vertical-align: top;
    width: ${cardWidth};
    ${margin}

    ${interactive &&
    css`
      :hover,
      :focus {
        box-shadow: var(--${hoverBoxShadow});
      }
    `}

    ${draggable &&
    css`
      cursor: move;
    `}

    ::-moz-focus-inner {
      border: 0;
    }
  `}
`;

interface StyledCardContentProps
  extends Pick<CardContextProps, "roundness" | "spacing"> {
  interactive?: boolean;
  href?: string;
  hasFooter: boolean;
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
  ${({ interactive }) =>
    interactive &&
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
  `}

  ${({ roundness, hasFooter }) => css`
    ${roundness === "default" &&
    css`
      border-top-left-radius: var(--borderRadius100);
      border-top-right-radius: var(--borderRadius100);
      ${!hasFooter &&
      css`
        border-bottom-left-radius: var(--borderRadius100);
        border-bottom-right-radius: var(--borderRadius100);
      `}
    `}

    ${roundness !== "default" &&
    css`
      border-top-left-radius: var(--borderRadius200);
      border-top-right-radius: var(--borderRadius200);
      ${!hasFooter &&
      css`
        border-bottom-left-radius: var(--borderRadius200);
        border-bottom-right-radius: var(--borderRadius200);
      `}
    `}
  `}
`;

export { StyledCard, StyledCardContent };
