import styled, { css } from "styled-components";
import { margin, MarginProps } from "styled-system";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import { InternalMessageVariant } from "./message.component";
import {
  variantPrimaryColor,
  variantPrimaryColorBorder,
  variantSubtleColor,
  variantSubtleIconColor,
  sizeMap,
} from "./message.config";

type MessageStyleProps = {
  variant: InternalMessageVariant;
  isSubtle?: boolean;
  transparent?: boolean;
  width?: string;
};

export const MessageStyle = styled.div.attrs(applyBaseTheme)<
  MessageStyleProps & MarginProps
>`
  position: relative;
  display: flex;
  box-sizing: border-box;
  border-radius: var(--global-radius-container-m);
  overflow: hidden;
  border: var(--global-borderwidth-xs) solid
    ${({ variant }) =>
      variantPrimaryColorBorder[
        variant as Exclude<InternalMessageVariant, "callout">
      ]};
  background-color: var(--message-contextual-bg);
  max-width: 720px;

  :focus {
    outline: none;
  }

  ${({ isSubtle, variant }) =>
    isSubtle &&
    css`
      border: none;
      background-color: ${variantSubtleColor[
        variant as Exclude<InternalMessageVariant, "neutral">
      ]};
    `}

  ${({ transparent }) =>
    transparent &&
    css`
      border: none;
      background: transparent;
    `}

  ${({ width }) => width && `width: ${width};`}
  ${margin}
`;

export const MessageWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex: 1 0 0;
`;

export const MessageContent = styled.div<{
  size: "medium" | "large";
  isSubtle?: boolean;
}>`
  display: flex;
  flex: 1 0 0;

  ${({ size, isSubtle }) => css`
    padding: ${sizeMap[size].padding};

    ${isSubtle &&
    css`
      gap: ${sizeMap[size].subtleGap};
    `}
  `}
`;

export const MessageContentWrapper = styled.div<{ size: "medium" | "large" }>`
  display: flex;
  flex-direction: column;
  justify-content: center;

  color: var(--message-contextual-txt);

  ${({ size }) => css`
    gap: ${sizeMap[size].contentGap};
    font: ${sizeMap[size].contentFont};
  `}
`;

export const MessageTitle = styled.p<{ size: "medium" | "large" }>`
  ${({ size }) => css`
    margin: 0;
    font: ${sizeMap[size].titleFont};
  `}
`;

export const CloseButtonWrapper = styled.div<{ size: "medium" | "large" }>`
  ${({ size }) => css`
    padding: ${sizeMap[size].closeButtonPadding};
  `}
`;

export const TypeIconStyle = styled.div<MessageStyleProps>`
  ${({ transparent, isSubtle, variant }) => css`
    display: flex;

    span {
      width: var(--global-size-2-xs);
      height: var(--global-size-2-xs);
    }

    ${!isSubtle &&
    css`
      background-color: ${variantPrimaryColor[
        variant as Exclude<InternalMessageVariant, "callout">
      ]};
      justify-content: center;
      align-items: center;
      width: var(--global-size-s);

      span {
        &:before {
          color: var(--message-contextual-icon);
        }
      }
    `}

    ${(isSubtle || transparent) &&
    css`
      background-color: transparent;
      span {
        &:before {
          color: ${variantSubtleIconColor[
            variant as Exclude<InternalMessageVariant, "neutral">
          ]};
        }
      }
    `}
  `}
`;
