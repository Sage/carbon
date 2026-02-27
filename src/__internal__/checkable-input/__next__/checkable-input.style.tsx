import styled, { css } from "styled-components";
import { StyledLabelContainer } from "../../label/label.style";
import HiddenCheckableInputStyle from "../hidden-checkable-input.style";
import StyledHintText from "../../hint-text/hint-text.style";

interface StyledCheckableProps {
  $isDisabled?: boolean;
}

export const StyledCheckableInput = styled.div<StyledCheckableProps>`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: var(--global-space-comp-s);

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
    grid-area: 2 / 2;
  }

  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
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
  min-height: var(--global-size-xs);
`;

interface StyledAccordionProps {
  $expanded?: boolean;
  $contentHeight?: string | number;
  $allowAnimation?: boolean;
}

export const StyledAccordion = styled.div<StyledAccordionProps>`
  overflow-y: hidden;
  visibility: hidden;
  max-height: 0;

  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: var(--global-space-comp-s);

  ${({ $allowAnimation }) =>
    $allowAnimation &&
    css`
      transition: all 0.4s;
    `}

  ${({ $expanded, $contentHeight }) => css`
    ${$expanded &&
    css`
      visibility: visible;
      max-height: ${$contentHeight}px;
    `}
  `}
`;

const getAccordionSpacing = {
  small: {
    top: "var(--global-space-comp-xs)", // top gap between line and input
    width: "var(--global-size-3-xs)", // width of line container (to match width of input)
  },
  medium: {
    top: "var(--global-space-comp-s)",
    width: "var(--global-size-xs)",
  },
  large: {
    top: "var(--global-space-comp-m)",
    width: "var(--global-size-s)",
  },
};

const contentPadding = "var(--global-space-comp-m)";

interface StyledAccordionContentProps {
  $size: "small" | "medium" | "large";
}

export const StyledLineContainer = styled.div<StyledAccordionContentProps>`
  display: flex;
  justify-content: center;

  ${({ $size }) =>
    $size &&
    css`
      width: ${getAccordionSpacing[$size].width};
    `}
`;

export const StyledAccordionLine = styled.div<StyledAccordionContentProps>`
  position: absolute;
  width: 2px;
  background-color: var(--input-typical-border-alt);
  border-radius: 2px;

  ${({ $size }) =>
    $size &&
    css`
      top: ${getAccordionSpacing[$size].top};

      // Calculate height taking into account top offset and padding of the content
      height: calc(
        100% - (${getAccordionSpacing[$size].top} + ${contentPadding})
      );
    `}
`;

export const StyledAccordionContent = styled.div`
  padding: ${contentPadding} 0;
`;
