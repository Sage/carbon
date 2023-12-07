import styled, { css } from "styled-components";
import { padding } from "styled-system";
import baseTheme from "../../../style/themes/base";
import { CardSpacing } from "../card.config";
import { CardRowProps } from "./card-row.component";

export interface StyledCardRowProps extends CardRowProps {
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

  &:first-of-type:not(:only-of-type) {
    padding-top: var(--spacing000);
    padding-bottom: var(--spacing000);
  }

  &:only-of-type {
    padding-top: var(--spacing000);
  }

  && {
    ${padding}
  }
`;

StyledCardRow.defaultProps = {
  theme: baseTheme,
};

export default StyledCardRow;
