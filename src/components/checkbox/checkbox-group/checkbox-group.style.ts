import styled, { css } from "styled-components";

const sizeMap = {
  small: {
    gap: "var(--global-space-comp-s)",
    labelFont: "var(--global-font-static-comp-regular-s)",
  },
  medium: {
    gap: "var(--global-space-comp-m)",
    labelFont: "var(--global-font-static-comp-regular-m)",
  },
  large: {
    gap: "var(--global-space-comp-l)",
    labelFont: "var(--global-font-static-comp-regular-l)",
  },
};

const StyledCheckboxGroupContent = styled.div<{
  $size: "small" | "medium" | "large";
  $inline?: boolean;
}>`
  ${({ $size, $inline }) => css`
    display: flex;
    flex-direction: column;
    gap: ${sizeMap[$size].gap};

    .checkable-label {
      font: ${sizeMap[$size].labelFont};
    }

    ${$inline &&
    css`
      flex-direction: row;
      gap: var(--global-space-comp-l);
    `}
  `}
`;

export default StyledCheckboxGroupContent;
