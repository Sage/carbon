import styled, { css } from "styled-components";
import { margin, MarginProps } from "styled-system";

import BaseTheme from "../../style/themes/base";
import StyledIconButton from "../icon-button/icon-button.style";
import { MessageVariant } from "./message.component";

const messageVariants = {
  error: "var(--colorsSemanticNegative500)",
  info: "var(--colorsSemanticInfo500)",
  success: "var(--colorsSemanticPositive500)",
  warning: "var(--colorsSemanticCaution500)",
  neutral: "var(--colorsSemanticNeutral500)",
};

type MessageStyleProps = {
  variant?: MessageVariant;
  transparent?: boolean;
  width?: string;
};

const MessageStyle = styled.div<MessageStyleProps & MarginProps>`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-content: center;
  border-radius: var(--borderRadius100);
  overflow: hidden;
  border: 1px solid ${({ variant }) => variant && messageVariants[variant]};
  background-color: var(--colorsUtilityYang100);
  min-height: 38px;

  :focus {
    outline: none;
  }

  ${({ transparent }) =>
    transparent &&
    css`
      border: none;
      background: transparent;
    `}

  ${StyledIconButton} {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
  }

  ${({ width }) => width && `width: ${width};`}

  ${margin}
`;

MessageStyle.defaultProps = {
  theme: BaseTheme,
};

export default MessageStyle;
