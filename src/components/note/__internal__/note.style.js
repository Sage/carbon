import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import baseTheme from "../../../style/themes/base";

const StyledNoteContent = styled.div`
  position: relative;
  width: 100%;

  ${({ theme }) => `
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
      background-color: ${theme.colors.white};
      line-height: 21px;
    }

    & + & {
      border-top: solid 1px ${theme.tile.separator};
    }
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

const StyledFooterContent = styled.div`
  line-height: 21px;
  align-items: baseline
    ${({ theme }) => `
    &:first-of-type {
      font-weight: bold;
      font-size: 14px;
      margin-top: ${2 * theme.spacing}px;
    }

    &:nth-of-type(2) {
      font-weight: bold;
      font-size: 12px;
      color: ${theme.note.timeStamp};
      margin-left: ${2 * theme.spacing}px;
      margin-top: ${2 * theme.spacing}px;
    }

    &:last-of-type:not(:nth-of-type(2)) {
      font-weight: bold;
      font-size: 12px;
      color: ${theme.note.timeStamp};
      cursor: pointer;
      margin-top: ${2 * theme.spacing}px;
      margin-left: ${3 * theme.spacing}px;
    }
  `};
`;

const StyledFooter = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => `${-theme.spacing}px;`}
  flex-wrap: wrap;
`;

const StyledNote = styled.div`
  ${({ theme, width }) => css`
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.tile.border};
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
`;

StyledNoteContent.defaultProps = {
  theme: baseTheme,
};

StyledNote.propTypes = {
  padding: PropTypes.string,
  width: PropTypes.number,
};

StyledNote.defaultProps = {
  theme: baseTheme,
};

StyledFooter.defaultProps = {
  theme: baseTheme,
};

StyledFooterContent.defaultProps = {
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
