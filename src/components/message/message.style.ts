import styled, { css } from "styled-components";
import { margin, MarginProps } from "styled-system";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import { InternalMessageVariant } from "./message.component";

// TODO: replace with design tokens
const variantPrimaryColor = {
  error: "#CD384B",
  info: "#0060A7",
  success: "#00811F ",
  warning: "#D64309",
  neutral: "var(--colorsSemanticNeutral500)",
  ai: "var(--colorsUtilityYin100)",
  callout: "var(--colorsUtilityYin100)",
};

const variantSubtleColor = {
  error: "#FDECEB",
  info: "#EAEEF6",
  success: "#E9F2E8 ",
  warning: "#FFEDE5",
  ai: "#EFEFEF",
  callout: "#E6FAE2",
};

type MessageStyleProps = {
  variant: InternalMessageVariant;
  isSubtle?: boolean;
  transparent?: boolean;
  width?: string;
  size?: "medium" | "large";
};

export const MessageStyle = styled.div.attrs(applyBaseTheme)<
  MessageStyleProps & MarginProps
>`
  position: relative;
  display: flex;
  border-radius: var(--borderRadius100);
  overflow: hidden;
  border: 1px solid ${({ variant }) => variantPrimaryColor[variant]};
  background-color: var(--colorsUtilityYang100);
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
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

export const MessageContent = styled.div<
  Pick<MessageStyleProps, "size" | "isSubtle">
>`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 12px;

  ${({ size, isSubtle }) => css`
    ${size === "large" &&
    css`
      padding: 20px;
    `}

    ${isSubtle &&
    css`
      gap: ${size === "large" ? "16px" : "8px"};
    `}
  `}
`;

export const MessageContentWrapper = styled.div<
  Pick<MessageStyleProps, "size">
>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  gap: 2px;
  font-size: 14px;

  ${({ size }) =>
    size === "large" &&
    css`
      gap: 4px;
      font-size: 16px;
    `}
`;

export const TypeIconStyle = styled.div<MessageStyleProps>`
  ${({ transparent, isSubtle, variant }) => css`
    display: flex;
    background-color: ${variantPrimaryColor[variant]};

    ${!isSubtle &&
    css`
      justify-content: center;
      align-items: center;
      width: 32px;
    `}

    span {
      width: 20px;
      height: 20px;
      &:before {
        color: var(--colorsUtilityYang100);
      }
    }

    ${isSubtle &&
    css`
      padding-top: 6px;
      background-color: transparent;
      span {
        &:before {
          color: ${variantPrimaryColor[variant]};
        }
      }
    `}

    ${transparent &&
    css`
      background-color: transparent;
      span {
        &:before {
          color: ${variantPrimaryColor[variant]};
        }
      }
    `}
  `}
`;
