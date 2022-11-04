import styled, { css } from "styled-components";
import { margin, MarginProps } from "styled-system";
import baseTheme from "../../style/themes/base";
import { CardSpacing } from "./card.config";

const paddingSizes = {
  small: "0 24px",
  medium: "0 32px",
  large: "0 48px",
};

export interface StyledCardProps extends MarginProps {
  cardWidth: string;
  interactive: boolean;
  draggable: boolean;
  spacing: CardSpacing;
}
const StyledCard = styled.div<StyledCardProps>`
  ${({ cardWidth, interactive, draggable, spacing }) => css`
    background-color: var(--colorsUtilityYang100);
    border: none;
    box-shadow: var(--boxShadow050);
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
        box-shadow: var(--boxShadow100);
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
