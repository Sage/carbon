import styled, { css } from "styled-components";
import { StyledLabelContainer } from "../../label/label.style";
import HiddenCheckableInputStyle from "../hidden-checkable-input.style";
import StyledHintText from "../../hint-text/hint-text.style";

interface StyledCheckableProps {
  size: "small" | "medium" | "large";
  disabled?: boolean;
}

export const StyledCheckableInput = styled.div<StyledCheckableProps>`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: var(--global-space-comp-s, 8px);
  line-height: 150%;

  ${StyledLabelContainer} {
    padding: 0;
    margin: 0;

    label {
      font-weight: 400;

      &:hover {
        cursor: pointer;
      }
    }
  }

  ${StyledHintText} {
    line-height: 150%;
    grid-area: 2 / 2;
  }

  ${({ disabled }) =>
    disabled &&
    css`
      label {
        color: var(--input-labelset-label-disabled, rgba(0, 0, 0, 0.42));
      }

      ${HiddenCheckableInputStyle}, label {
        &:hover,
        &:focus {
          outline: none;
          cursor: not-allowed;
        }
      }
    `}
`;

export const StyledCheckableInputWrapper = styled.div`
  display: flex;
  align-items: center;
  min-height: 24px;
`;

interface StyledAccordionProps {
  expanded?: boolean;
  contentHeight?: string | number;
  allowAnimation?: boolean;
}

export const StyledAccordion = styled.div<StyledAccordionProps>`
  overflow-y: hidden;
  visibility: hidden;
  max-height: 0;

  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: var(--global-space-comp-s, 8px);

  ${({ allowAnimation }) =>
    allowAnimation &&
    css`
      transition: all 0.4s;
    `}

  ${({ expanded, contentHeight }) => css`
    ${expanded &&
    css`
      visibility: visible;
      max-height: ${contentHeight}px;
    `}
  `}
`;

const getAccordionSpacing = {
  small: {
    top: "var(--global-space-comp-xs, 4px)", // gap between line and input
    width: "var(--global-size-3xs, 16px)", // width of line container (width of input)
  },
  medium: {
    top: "var(--global-space-comp-s, 8px)",
    width: "var(--global-size-xs, 24px)",
  },
  large: {
    top: "var(--global-space-comp-m, 12px)",
    width: "var(--global-size-s, 32px)",
  },
};

const contentPadding = "var(--global-space-comp-m, 12px)";

interface StyledAccordionContentProps {
  size: "small" | "medium" | "large";
}

export const StyledLineContainer = styled.div<StyledAccordionContentProps>`
  display: flex;
  justify-content: center;

  ${({ size }) =>
    size &&
    css`
      width: ${getAccordionSpacing[size].width};
    `}
`;

export const StyledAccordionLine = styled.div<StyledAccordionContentProps>`
  position: absolute;
  width: 2px;
  background-color: var(--input-typical-border-alt, rgba(0, 0, 0, 0.3));
  border-radius: 2px;

  ${({ size }) =>
    size &&
    css`
      top: ${getAccordionSpacing[size].top};

      // Calculate height taking into account top offset and padding of the content
      height: calc(
        100% - (${getAccordionSpacing[size].top} + ${contentPadding})
      );
    `}
`;

export const StyledAccordionContent = styled.div`
  padding: ${contentPadding} 0;
`;
