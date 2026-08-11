import styled, { css } from "styled-components";
import { margin } from "styled-system";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import {
  StyledLinkPreview,
  StyledPreviewWrapper,
  StyledTitle,
  StyledUrl,
} from "../link-preview/link-preview.style";
import { VARIANT_TYPES } from "../typography/typography.component";

const StyledNoteContent = styled.div<{
  $hasTitlelessControl?: boolean;
  $hasPreviews?: boolean;
  $isBody?: boolean;
}>`
  position: relative;

  ${({ $isBody }) =>
    $isBody &&
    css`
      display: flex;
      flex-direction: column;
      flex: 1;
      gap: var(--global-space-comp-l);
      min-width: 0;
      padding: var(--global-space-comp-xl);

      > div[readonly] {
        padding: var(--global-space-none);
      }
    `}

  ${({ $hasPreviews }) =>
    $hasPreviews &&
    css`
      margin-top: var(--global-space-comp-l);
    `}

  ${({ $hasTitlelessControl }) =>
    $hasTitlelessControl &&
    css`
      [role="article"] {
        padding-inline-end: calc(
          var(--global-size-m) + var(--global-space-comp-l)
        );
      }
    `}

  a:not([data-component="link-preview"]) {
    color: var(--link-typical-label-default);

    &:hover {
      cursor: pointer;
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
`;

const StyledNoteMain = styled.div`
  [role="article"] {
    color: var(--container-standard-txt-default);
    font: var(--global-font-static-body-regular-l);

    > :last-child {
      margin-bottom: var(--global-space-none);
    }
  }
`;

const StyledNoteTitle = styled.h3`
  color: var(--container-standard-txt-default);
  font: var(--global-font-static-heading-m);
  margin: var(--global-space-none);
`;

const StyledInlineControl = styled.div<{ $isTitleless?: boolean }>`
  display: inline-flex;
  flex: 0 0 var(--global-size-m);
  height: var(--global-size-m);
  min-width: fit-content;
  width: var(--global-size-m);

  ${({ $isTitleless }) =>
    $isTitleless &&
    css`
      inset-inline-end: var(--global-space-comp-xl);
      position: absolute;
      top: var(--global-space-comp-xl);
    `}
`;

const StyledTitleRow = styled.div`
  align-items: flex-start;
  display: flex;
  gap: var(--global-space-comp-l);
  justify-content: flex-end;
  min-width: 0;
  width: 100%;

  > :not(${StyledInlineControl}) {
    flex: 1;
    min-width: 0;
    padding-top: var(--global-space-comp-xs);
  }
`;

const StyledTitleWrapper = styled.div`
  ${VARIANT_TYPES.map(
    (variant) => `
      ${variant}{
        font: var(--global-font-static-heading-m);
      }
    `,
  )}
`;

const StyledFooterContent = styled.div<{ $isName?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: var(--global-space-comp-xs);

  > span {
    color: var(--container-standard-txt-default);
    font: var(--global-font-static-comp-medium-m);
  }

  ${({ $isName }) =>
    $isName &&
    css`
      color: var(--container-standard-txt-default);
      font: var(--global-font-static-section-heading-s);
    `}

  time {
    color: var(--container-standard-txt-alt);
    font: var(--global-font-static-comp-regular-xs);
  }
`;

const StyledFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--global-space-comp-s);
  padding: var(--global-space-comp-l) var(--global-space-none)
    var(--global-space-comp-xl);
`;

const StyledTimestamps = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--global-space-comp-xl);
`;

const StyledNote = styled.div.attrs(applyBaseTheme)<{ width: number }>`
  ${({ width }) => css`
    background-color: var(--container-standard-bg-default);
    border: var(--global-borderwidth-xs) solid
      var(--container-standard-border-default);
    border-radius: var(--global-radius-action-m);
    display: flex;
    flex-direction: column;
    min-width: 288px;
    padding: var(--global-space-none);
    position: relative;
    width: ${width}%;
    box-sizing: border-box;

    ${StyledNoteContent} {
      box-sizing: border-box;
      width: auto;
    }
  `}

  ${StyledLinkPreview} {
    margin: var(--global-space-none);
    min-width: 0;
    overflow: hidden;

    ${StyledPreviewWrapper} {
      min-width: 0;
    }

    ${StyledTitle},
    ${StyledUrl} {
      overflow: hidden;
    }

    :not(:first-of-type) {
      margin-top: var(--global-space-comp-s);
    }
  }

  > [data-role="note-metadata"] {
    border-radius: var(--global-radius-action-xs) var(--global-radius-action-xs)
      var(--global-radius-none) var(--global-radius-none);
    border-top-color: var(--container-standard-border-default);
    border-top-style: solid;
    border-top-width: var(--global-borderwidth-xs);
    margin-left: var(--global-space-comp-xl);
    margin-right: var(--global-space-comp-xl);
  }

  > [data-role="note-previews"] {
    padding: var(--global-space-none) var(--global-space-comp-xl)
      var(--global-space-comp-xl);
  }

  .textBold {
    font-weight: bold !important;
  }
  .textItalic {
    font-style: italic;
  }
  .textUnderline {
    text-decoration: underline;
  }

  .mention {
    cursor: default !important;
  }

  ${margin}
`;

export {
  StyledNote,
  StyledNoteContent,
  StyledNoteMain,
  StyledInlineControl,
  StyledNoteTitle,
  StyledTitleRow,
  StyledTitleWrapper,
  StyledFooter,
  StyledFooterContent,
  StyledTimestamps,
};
