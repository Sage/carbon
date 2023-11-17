import styled, { css } from "styled-components";
import { padding } from "styled-system";
import baseTheme from "../../../style/themes/base";
import { CardSpacing } from "../card.config";
import { CardRowProps } from "./card-row.component";

export interface StyledCardRowProps extends CardRowProps {
  /**
   * Spacing prop is set in Card and defines the padding for the CardRow (the first CardRow has no padding by default).
   * For more granular control of CardRow padding these can be over-ridden by Padding props from styled-system.
   */
  spacing: CardSpacing;
}
const paddingSizes = {
  small: "var(--spacing200)",
  medium: "var(--spacing300)",
  large: "var(--spacing400)",
};

const StyledCardRow = styled.div<StyledCardRowProps>`
  display: flex;
  ${({ spacing }) => css`
    padding-top: ${paddingSizes[spacing]};
    padding-bottom: ${paddingSizes[spacing]};
  `}

  ${padding}
`;

StyledCardRow.defaultProps = {
  theme: baseTheme,
};

export default StyledCardRow;
