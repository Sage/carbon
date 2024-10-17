import styled, { css } from "styled-components";
import { margin } from "styled-system";
import baseTheme from "../../style/themes/base";
import { StyledLinkPreview } from "../link-preview/link-preview.style";
import { VARIANT_TYPES } from "../typography/typography.component";

const StyledNoteContent = styled.div<{
  hasPreview?: boolean;
}>`
  position: relative;
  width: 100%;

  ${({ hasPreview }) => css`
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

const StyledNoteMain = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: var(--spacing300);
`;

const StyledInlineControl = styled.div`
  display: inline-block;
  min-width: fit-content;
`;

const StyledTitleWrapper = styled.div`
  ${VARIANT_TYPES.map(
    (variant) => `
${variant}{
  font-weight: 700;
  font-size: 16px;
  line-height: 21px;
  padding-bottom: 16px;
}
  `
  )}
`;

const StyledFooterContent = styled.div<{ hasName: boolean }>`
  line-height: 21px;
  align-items: baseline;
  font-weight: 500;

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
    border-radius: var(--borderRadius100);
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
  StyledNoteMain,
  StyledInlineControl,
  StyledTitleWrapper,
  StyledFooter,
  StyledFooterContent,
};
