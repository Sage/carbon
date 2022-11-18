import styled, { css } from "styled-components";
import { margin } from "styled-system";
import baseTheme from "../../style/themes/base";
import { StyledLinkPreview } from "../link-preview/link-preview.style";

const StyledNoteContent = styled.div<{ hasPreview?: boolean }>`
  position: relative;
  width: 100%;

  ${({ hasPreview }) => css`
    &:not(:last-of-type) {
      padding-bottom: 24px;
    }

    div.DraftEditor-root {
      min-height: inherit;
      height: 100%;
    }

    div.DraftEditor-editorContainer,
    div.public-DraftEditor-content {
      min-height: inherit;
      height: 100%;
      background-color: var(--colorsUtilityYang100);
      line-height: 21px;
    }

    &:last-of-type:not(:first-of-type) {
      border-top: solid 1px var(--colorsUtilityMajor050);
    }

    ${hasPreview &&
    `
      margin-top: var(--spacing200);
    `}
  `}
`;

const StyledInlineControl = styled.div`
  position: absolute;
  top: 24px;
  right: 16px;
  z-index: 100;
`;

const StyledTitle = styled.header`
  font-weight: 900;
  font-size: 16px;
  line-height: 21px;
  padding-bottom: 16px;
`;

const StyledFooterContent = styled.div<{ hasName: boolean }>`
  line-height: 21px;
  align-items: baseline;
  font-weight: bold;

  ${({ hasName }) => css`
    margin-top: var(--spacing200);

    ${hasName &&
    css`
      &:first-of-type {
        font-size: 14px;
      }

      &:nth-of-type(2) {
        font-size: 12px;
        color: var(--colorsUtilityYin065);
        margin-left: var(--spacing200);
      }

      &:last-of-type:not(:nth-of-type(2)) {
        font-size: 12px;
        color: var(--colorsUtilityYin065);
        cursor: pointer;
        margin-left: var(--spacing300);
      }
    `}

    ${!hasName &&
    css`
      &:first-of-type {
        font-size: 12px;
        color: var(--colorsUtilityYin065);
      }

      &:last-of-type:not(:first-of-type) {
        font-size: 12px;
        color: var(--colorsUtilityYin065);
        cursor: pointer;
        margin-left: var(--spacing300);
      }
    `}
  `}
`;

const StyledFooter = styled.div`
  display: flex;
  margin-bottom: calc(-1 * var(--spacing100));
  flex-wrap: wrap;
`;

const StyledNote = styled.div<{ width: number }>`
  ${({ width }) => css`
    background-color: var(--colorsUtilityYang100);
    border: 1px solid var(--colorsUtilityMajor100);
    display: flex;
    flex-direction: column;
    padding: 24px;
    position: relative;
    width: ${width}%;
    box-sizing: border-box;

    ${StyledNoteContent} {
      box-sizing: border-box;
      width: auto;
    }
  `}

  ${StyledLinkPreview} {
    margin: 0px;

    :not(:first-of-type) {
      margin-top: 8px;
    }
  }

  ${margin}
`;

StyledNote.defaultProps = {
  theme: baseTheme,
};

export {
  StyledNote,
  StyledNoteContent,
  StyledInlineControl,
  StyledTitle,
  StyledFooter,
  StyledFooterContent,
};
