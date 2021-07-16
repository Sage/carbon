import styled, { css } from "styled-components";
import { baseTheme } from "../../style/themes";
import PreviewBars, { StyledPreview } from "../preview/preview.style";

const StyledLinkPreview = styled.a`
  display: flex;
  margin: 8px;
  text-decoration: none;
  outline: none;

  ${({ theme, as }) => css`
    border: 1px solid ${theme.editorLinkPreview.border};
    background-color: ${theme.editorLinkPreview.background};
    color: ${theme.text.color};

    ${as !== "div" &&
    css`
      :focus {
        outline: 2px solid ${theme.colors.focus};
        outline-offset: -1px;
      }

      :hover {
        cursor: pointer;
        background-color: ${theme.editorLinkPreview.hoverBackground};
      }
    `}
  `}
`;

const StyledCloseIconWrapper = styled.div`
  padding: 16px;
`;

const StyledPreviewWrapper = styled.div`
  flex-grow: 1;
  padding: 16px;

  ${({ isLoading }) =>
    !isLoading &&
    css`
      ${StyledPreview} {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
    `}

  ${PreviewBars}:first-of-type {
    margin-top: 8px;
  }

  ${PreviewBars}:not(:first-of-type) {
    margin-top: 16px;
  }
`;

const StyledTitle = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
`;

const StyledDescription = styled.div`
  > div {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    padding-top: 4px;
  }

  flex-grow: 1;
`;

const StyledUrl = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: ${({ theme }) => theme.editorLinkPreview.url};
`;

StyledLinkPreview.defaultProps = {
  theme: baseTheme,
};

StyledUrl.defaultProps = {
  theme: baseTheme,
};

export {
  StyledLinkPreview,
  StyledCloseIconWrapper,
  StyledPreviewWrapper,
  StyledTitle,
  StyledDescription,
  StyledUrl,
};
