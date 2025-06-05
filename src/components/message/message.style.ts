import styled, { css } from "styled-components";
import { margin, MarginProps } from "styled-system";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import { MessageVariant, TypeIconProps } from "./message.component";

const messageVariants = {
  error: "var(--colorsSemanticNegative500)",
  info: "var(--colorsSemanticInfo500)",
  success: "var(--colorsSemanticPositive500)",
  warning: "var(--colorsSemanticCaution500)",
  neutral: "var(--colorsSemanticNeutral500)",
  ai: "var(--colorsUtilityYin100)",
};

type MessageStyleProps = {
  variant?: MessageVariant;
  transparent?: boolean;
  width?: string;
};

const MessageStyle = styled.div.attrs(applyBaseTheme)<
  MessageStyleProps & MarginProps
>`
  position: relative;
  display: flex;
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

  ${({ width }) => width && `width: ${width};`}
  ${margin}
`;

const MessageContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing200);
  gap: var(--spacing300);
`;

const TypeIconStyle = styled.div<TypeIconProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ variant }) => messageVariants[variant]};
  min-width: 30px;

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

export default MessageStyle;
export { MessageContent, TypeIconStyle };
