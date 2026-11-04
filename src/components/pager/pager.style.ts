import styled, { css } from "styled-components";

interface StyledPagerContainerProps {
  $variant?: "alternate" | "default";
  $size: "small" | "medium";
  $layout?: "single" | "two-row" | "three-row";
}

const sizeMap = {
  small: {
    padding: "var(--global-space-comp-m)",
    font: "var(--global-font-static-comp-regular-s)",
    rowGap: "var(--global-space-comp-m)",
  },
  medium: {
    padding: "var(--global-space-comp-l)",
    font: "var(--global-font-static-comp-regular-m)",
    rowGap: "var(--global-space-comp-l)",
  },
};

export const StyledPagination = styled.nav<StyledPagerContainerProps>`
  ${({ $variant, $size, $layout }) => css`
    --fieldSpacing: 0;

    display: flex;
    align-items: center;
    flex-direction: ${$layout === "single" ? "row" : "column"};
    box-sizing: border-box;
    flex-wrap: wrap;
    font: ${sizeMap[$size].font};

    width: 100%;
    min-width: 288px;
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

interface StyledPageInfoProps {
  $layout: "single" | "two-row" | "three-row";
  $alignment?: "fill" | "centred";
}

export const StyledPageInfo = styled.div<StyledPageInfoProps>`
  ${({ $layout, $alignment }) => css`
    display: flex;
    align-items: center;
    flex-direction: ${$layout === "three-row" ? "column" : "row"};
    justify-content: ${$alignment === "centred" ? "center" : "flex-end"};
    gap: var(--global-space-comp-l);
    flex: 1 0 0;
    white-space: nowrap;
    color: var(--input-labelset-label-default);
  `}
`;

export const StyledPageSizeSelect = styled.div`
  display: flex;
  align-items: center;
  gap: var(--global-space-comp-s);
  min-width: fit-content;

  && input {
    field-sizing: content;
  }
`;

export const StyledTotalRecords = styled.span`
  font: var(--global-font-static-comp-medium-s);
  margin-right: var(--global-space-comp-xs);
`;
