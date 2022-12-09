import styled, { css } from "styled-components";
import { margin, MarginProps } from "styled-system";
import * as DesignTokens from "@sage/design-tokens/js/base/common";
import baseTheme from "../../style/themes/base";
import { CardSpacing } from "./card.config";

const paddingSizes = {
  small: "0 24px",
  medium: "0 32px",
  large: "0 48px",
};

type DesignTokensType = keyof typeof DesignTokens;
export type BoxShadowsType = Extract<DesignTokensType, `boxShadow${string}`>;

export interface StyledCardProps extends MarginProps {
  cardWidth: string;
  interactive: boolean;
  draggable: boolean;
  spacing: CardSpacing;
  boxShadow?: BoxShadowsType;
  hoverBoxShadow?: BoxShadowsType;
}
const StyledCard = styled.div<StyledCardProps>`
  ${({
    cardWidth,
    interactive,
    draggable,
    spacing,
    boxShadow = "boxShadow050",
    hoverBoxShadow = "boxShadow100",
  }) => css`
    background-color: var(--colorsUtilityYang100);
    border: none;
    box-shadow: var(--${boxShadow});
    color: var(--colorsUtilityYin090);
    margin: 25px;
    padding: ${paddingSizes[spacing]};
    transition: all 0.3s ease-in-out;
    vertical-align: top;
    width: ${cardWidth};
    outline: none;
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
