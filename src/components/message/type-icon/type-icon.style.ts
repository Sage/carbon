import styled, { css } from "styled-components";

import { MessageVariant } from "../message.component";

const messageVariants = {
  error: "var(--colorsSemanticNegative500)",
  info: "var(--colorsSemanticInfo500)",
  success: "var(--colorsSemanticPositive500)",
  warning: "var(--colorsSemanticCaution500)",
  neutral: "var(--colorsSemanticNeutral500)",
  notification: "var(--colorsSemanticInfo500)",
};

type TypeIconStyleProps = {
  /** set background to be invisible */
  transparent?: boolean;
  /** set type of message based on new DLS standard */
  variant: MessageVariant;
};

const TypeIconStyle = styled.div<TypeIconStyleProps>`
  align-items: center;
  background-color: ${({ variant }) => messageVariants[variant]};
  display: flex;
  justify-content: center;
  line-height: 100%;
  min-width: 30px;
  text-align: center;
  span {
    &:before {
      color: var(--colorsUtilityYang100);
    }
  }

  ${({ transparent, variant }) =>
    transparent &&
    css`
      background-color: transparent;
      span {
        &:before {
          color: ${messageVariants[variant]};
        }
      }
    `}
`;

export default TypeIconStyle;
