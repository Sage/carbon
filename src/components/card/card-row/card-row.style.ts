import styled, { css } from "styled-components";
import { padding, PaddingProps } from "styled-system";
import { Expand } from "../../../__internal__/utils/helpers/types";
import baseTheme from "../../../style/themes/base";
import { CardSpacing } from "../card.config";

export interface StyledCardRowProps extends Expand<PaddingProps> {
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
