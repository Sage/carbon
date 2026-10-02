import styled, { css } from "styled-components";
import addFocusStyling from "../../style/utils/add-focus-styling";
import applyBaseTheme from "../../style/themes/apply-base-theme";

const sizeMap = {
  small: {
    wrapperPadding: "var(--global-space-comp-s)",
    wrapperGap: "var(--global-space-comp-xs)",
    titleWrapperGap: "var(--global-space-comp-s)",
    titleFont: "var(--global-font-static-comp-medium-s)",
    descriptionFont: "var(--global-font-static-comp-regular-s)",
    urlFont: "var(--global-font-static-comp-lined-regular-s)",
  },
  medium: {
    wrapperPadding: "var(--global-space-comp-m)",
    wrapperGap: "var(--global-space-comp-m)",
    titleWrapperGap: "var(--global-space-comp-m)",
    titleFont: "var(--global-font-static-comp-medium-m)",
    descriptionFont: "var(--global-font-static-comp-regular-m)",
    urlFont: "var(--global-font-static-comp-lined-regular-m)",
  },
  large: {
    wrapperPadding: "var(--global-space-comp-l)",
    wrapperGap: "var(--global-space-comp-m)",
    titleWrapperGap: "var(--global-space-comp-l)",
    titleFont: "var(--global-font-static-comp-medium-l)",
    descriptionFont: "var(--global-font-static-comp-regular-l)",
    urlFont: "var(--global-font-static-comp-lined-regular-l)",
  },
};
interface StyledPreviewProps {
  $size: "small" | "medium" | "large";
  $isLoading?: boolean;
}

export const StyledWrapper = styled.div<StyledPreviewProps>`
  ${({ $size, $isLoading }) => css`
    display: flex;
    flex-direction: column;

    ${!$isLoading &&
    css`
      padding: ${sizeMap[$size].wrapperPadding};
      gap: ${sizeMap[$size].wrapperGap};
    `}

    ${$isLoading &&
    css`
      box-sizing: border-box;
      width: 100%;
      padding: var(--global-space-comp-s) var(--global-space-comp-l);
    `}
  `}
`;

export const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledTitleWrapper = styled.div<StyledPreviewProps>`
  ${({ $size }) => css`
    display: flex;
    align-items: flex-start;
    gap: ${sizeMap[$size].titleWrapperGap};
  `}
`;

export const StyledTitle = styled.div<StyledPreviewProps>`
  ${({ $size }) => css`
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    flex: 1 0 0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: normal;

    padding-top: var(--global-space-comp-xs);
    color: var(--container-action-txt-active);
    font: ${sizeMap[$size].titleFont};
  `}
`;

export const StyledDescription = styled.p<StyledPreviewProps>`
  ${({ $size }) => css`
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;

    color: var(--container-action-txt-alt-default);
    font: ${sizeMap[$size].descriptionFont};
  `}
`;

export const StyledUrl = styled.div<StyledPreviewProps>`
  ${({ $size }) => css`
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;

    color: var(--container-action-txt-active);
    font: ${sizeMap[$size].urlFont};
    text-decoration-line: underline;
  `}
`;

export const StyledThumbnailWrapper = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  position: relative;
  overflow: hidden;
  border-top-right-radius: var(--global-radius-container-xs);
  border-top-left-radius: var(--global-radius-container-xs);
`;

export const StyledThumbnailImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
`;

export const StyledLinkPreview = styled.a.attrs(applyBaseTheme)<{
  as?: "a" | "div";
}>`
  ${({ as }) => css`
    display: flex;
    flex-direction: column;
    min-width: 224px;
    width: fit-content;
    height: fit-content;
    max-width: 400px;
    text-decoration: none;
    outline: none;
    box-sizing: border-box;
    border-radius: var(--global-radius-container-xs);
    border: var(--global-borderwidth-xs) solid
      var(--container-action-border-alt);
    background: var(--container-action-bg-default);

    ${as !== "div" &&
    css`
      &:focus {
        ${addFocusStyling()}
      }

      &:hover {
        cursor: pointer;
        border-color: var(--container-action-borderalt-hover);
        background: var(--container-action-bg-hover);

        ${StyledTitle}, ${StyledDescription}, ${StyledUrl} {
          color: var(--container-action-txt-hover);
        }
      }
    `}
  `}
`;
