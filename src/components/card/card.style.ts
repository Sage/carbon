import styled, { css } from "styled-components";
import { margin, MarginProps } from "styled-system";
import * as DesignTokens from "@sage/design-tokens/js/base/common";
import baseTheme from "../../style/themes/base";
import { CardContextProps } from "./__internal__/card-context";

const paddingSizes = {
  small: "0 24px",
  medium: "0 32px",
  large: "0 48px",
};

type DesignTokensType = keyof typeof DesignTokens;
export type BoxShadowsType = Extract<DesignTokensType, `boxShadow${string}`>;

export interface StyledCardProps
  extends MarginProps,
    Pick<CardContextProps, "roundness" | "spacing"> {
  cardWidth: string;
  interactive: boolean;
  draggable: boolean;
  height?: string;
  boxShadow?: BoxShadowsType;
  hoverBoxShadow?: BoxShadowsType;
}
const StyledCard = styled.div<StyledCardProps>`
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
    margin: 25px;
    outline: none;
    padding: ${paddingSizes[spacing]};
    transition: all 0.3s ease-in-out;
    vertical-align: top;
    width: ${cardWidth};
    ${margin}

    ${interactive &&
    css`
      cursor: pointer;

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

StyledCard.defaultProps = {
  theme: baseTheme,
};

export default StyledCard;
