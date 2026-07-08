import styled, { css } from "styled-components";

interface StyledPagerContainerProps {
  $variant?: "alternate" | "default";
  $size: "small" | "medium" | "large";
}

const sizeMap = {
  small: {
    minHeight: "var(--global-size-m)",
    padding: "var(--global-space-comp-xs)",
    font: "var(--global-font-static-comp-regular-s)",
    rowGap: "var(--global-space-comp-s)",
  },
  medium: {
    minHeight: "var(--global-size-xl)",
    padding: "var(--global-space-comp-s)",
    font: "var(--global-font-static-comp-regular-m)",
    rowGap: "var(--global-space-comp-l)",
  },
  large: {
    minHeight: "var(--global-size-2-xl)",
    padding: "var(--global-space-comp-s)",
    font: "var(--global-font-static-comp-regular-l)",
    rowGap: "var(--global-space-comp-l)",
  },
};

export const StyledPagination = styled.nav<StyledPagerContainerProps>`
  ${({ $variant, $size }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    flex-wrap: wrap;
    font: ${sizeMap[$size].font};

    width: 100%;
    min-width: 288px;
    min-height: ${sizeMap[$size].minHeight};
    padding: ${sizeMap[$size].padding};
    row-gap: ${sizeMap[$size].rowGap};

    border-radius: var(--global-radius-container-m);
    border: var(--global-borderwidth-xs) solid
      var(--container-standard-border-default);
    background: var(--container-standard-bg-alt);

    ${$variant === "alternate" &&
    css`
      background: none;
      border: none;
    `}
  `}
`;

export const StyledPageSizeSelect = styled.div`
  display: flex;
  align-items: center;
  gap: var(--global-space-comp-s);

  && input {
    field-sizing: content;
  }
`;
