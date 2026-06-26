import styled, { css } from "styled-components";
import { margin } from "styled-system";

const sizeMap = {
  small: {
    contentMargin: "var(--global-space-comp-xs)",
    validationGap: "var(--global-space-comp-xs)",
    headerPadding: "var(--global-space-comp-s)",
    footerPadding: "var(--global-space-comp-s)",
  },
  medium: {
    contentMargin: "var(--global-space-comp-s)",
    validationGap: "var(--global-space-comp-s)",
    headerPadding: "var(--global-space-comp-m)",
    footerPadding: "var(--global-space-comp-m)",
  },
  large: {
    contentMargin: "var(--global-space-comp-m)",
    validationGap: "var(--global-space-comp-s)",
    headerPadding: "var(--global-space-comp-l)",
    footerPadding: "var(--global-space-comp-l)",
  },
};

export const StyledTextEditor = styled.div<{ error?: boolean }>`
  position: relative;
  box-sizing: border-box;
  ${({ error }) =>
    error &&
    css`
      margin: -1px;
    `}
`;

export const StyledTextEditorWrapper = styled.div`
  margin-bottom: var(--fieldSpacing);
  ${margin}
  min-width: 288px;
  display: flex;
  flex-direction: column;
`;

interface StyledProps {
  size: "small" | "medium" | "large";
}

export const StyledWrapper = styled.div<StyledProps>`
  ${({ size }) => css`
    display: flex;
    flex-direction: column;
    gap: ${sizeMap[size].validationGap};
    margin-top: ${sizeMap[size].contentMargin};
    position: relative;

    .textBold {
      font-weight: bold !important;
    }

    .textItalic {
      font-style: italic;
    }

    .textUnderline {
      text-decoration: underline;
    }

    a:not([data-component="link-preview"]) {
      color: var(--link-typical-label-default);
      cursor: pointer;

      &:hover {
        color: var(--link-typical-label-hover);
      }

      &:focus {
        outline: none;
        text-decoration: none;
        color: var(--focus-label);
        background-color: var(--focus-bg);
        border-radius: var(--global-radius-action-xs);
        box-shadow: 0 var(--global-size-5-xs) 0 0 var(--focus-borderalt);
      }
    }
  `}
`;

export const StyledEditorToolbarWrapper = styled.div<{ isReadOnly?: boolean }>`
  border-radius: var(--global-radius-container-m);
  border: var(--global-borderwidth-xs) solid var(--input-typical-border-default);
  background-color: var(--input-typical-bg-default);

  ${({ isReadOnly }) =>
    isReadOnly &&
    css`
      border-color: var(--input-typical-border-read-only);
      background-color: var(--input-typical-bg-read-only);
    `};
`;

export const StyledHeaderWrapper = styled.div<StyledProps>`
  ${({ size }) => css`
    padding: ${sizeMap[size].headerPadding} ${sizeMap[size].headerPadding} 0;
  `};
`;

export const StyledFooterWrapper = styled.div<StyledProps>`
  border-top: var(--global-borderwidth-xs) solid
    var(--input-typical-border-default);
  ${({ size }) => css`
    padding: ${sizeMap[size].footerPadding};
  `};
`;
