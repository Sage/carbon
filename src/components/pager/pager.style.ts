import styled, { css } from "styled-components";

interface StyledPagerContainerProps {
  $variant?: "alternate" | "default";
  $size: "small" | "medium";
  $layout: "single" | "two-row" | "three-row";
  $alignment: "fill" | "centred";
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
};

export const StyledPagination = styled.nav<StyledPagerContainerProps>`
  ${({ $variant, $size, $layout, $alignment }) => css`
    --fieldSpacing: 0;

    display: flex;
    align-items: center;
    justify-content: ${$layout === "single" && $alignment === "fill"
      ? "space-between"
      : "center"};
    flex-direction: ${$layout === "single" ? "row" : "column"};
    box-sizing: border-box;
    flex-wrap: ${$layout === "single" ? "nowrap" : "nowrap"};
    font: ${sizeMap[$size].font};

    width: 100%;
    min-width: 288px;
    min-height: ${sizeMap[$size].minHeight};
    padding: ${sizeMap[$size].padding};
    row-gap: ${sizeMap[$size].rowGap};
    column-gap: var(--global-space-comp-l);

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

export const StyledPageInfo = styled.div<{
  $layout: "single" | "two-row" | "three-row";
}>`
  ${({ $layout }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: ${$layout === "three-row" ? "column" : "row"};
    gap: var(--global-space-comp-s);
    flex-wrap: wrap;
  `}
`;

export const StyledPageInfoDivider = styled.span`
  display: inline-block;
  width: var(--global-borderwidth-xs);
  height: var(--global-size-s);
  background: var(--container-standard-border-default);
`;

export const StyledPageSizeSelect = styled.div`
  display: flex;
  align-items: center;
  gap: var(--global-space-comp-s);
  white-space: nowrap;

  && input {
    field-sizing: content;
  }
`;

export const StyledTotalRecords = styled.span`
  white-space: nowrap;
`;
