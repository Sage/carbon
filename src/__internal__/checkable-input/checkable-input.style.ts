import styled, { css } from "styled-components";

export const StyledCheckableInput = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr;
  grid-column-gap: var(--global-space-comp-s);

  .checkable-hint-text {
    grid-area: 2 / 2;
  }
`;

export const StyledCheckableInputWrapper = styled.div`
  display: flex;
  align-items: center;
  min-height: var(--global-size-xs);
`;

interface StyledAccordionProps {
  $expanded?: boolean;
  $allowAnimation?: boolean;
}

export const StyledAccordion = styled.div<StyledAccordionProps>`
  position: relative;
  display: grid;
  grid-template-rows: 0fr;
  visibility: hidden;

  ${({ $allowAnimation }) =>
    $allowAnimation &&
    css`
      transition: all 0.4s;
    `}

  ${({ $expanded }) =>
    $expanded &&
    css`
      visibility: visible;
      grid-template-rows: 1fr;
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

export const StyledAccordionWrapper = styled.div`
  overflow: hidden;
  min-height: 0;
  min-width: 0;

  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: var(--global-space-comp-s);
`;

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
