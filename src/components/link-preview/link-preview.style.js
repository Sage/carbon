import styled, { css } from "styled-components";
import { StyledPreview } from "../preview/preview.style";
import { StyledPreviewPlaceholder } from "../preview/__internal__/preview-placeholder.style";

const StyledLinkPreview = styled.a`
  display: flex;
  margin: 8px;
  text-decoration: none;
  outline: none;

  ${({ as }) => css`
    border: 1px solid var(--colorsUtilityMajor050);
    background-color: var(--colorsUtilityMajor025);
    color: var(--colorsUtilityYin090);

    ${as !== "div" &&
    css`
      :focus {
        outline: 2px solid var(--colorsSemanticFocus500);
        outline-offset: -1px;
      }

      :hover {
        cursor: pointer;
        background-color: var(--colorsUtilityMajor100);
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

  ${StyledPreviewPlaceholder}:first-of-type {
    margin-top: 8px;
  }

  ${StyledPreviewPlaceholder}:not(:first-of-type) {
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
  color: var(--colorsUtilityMajor400);
`;

export {
  StyledLinkPreview,
  StyledCloseIconWrapper,
  StyledPreviewWrapper,
  StyledTitle,
  StyledDescription,
  StyledUrl,
};
