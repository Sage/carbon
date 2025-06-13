import styled, { css } from "styled-components";
import StyledTypography from "../../../typography/typography.style";
import StyledIcon from "../../../icon/icon.style";
import {
  StyledProgressBar,
  InnerBar as ProgressTrackerInnerBar,
} from "../../../progress-tracker/progress-tracker.style";
import StyledLoaderBar, {
  StyledLoader,
  InnerBar as LoaderBarInnerBar,
} from "../../../loader-bar/loader-bar.style";
import StyledLink from "../../../link/__internal__/base-link.style";

export const StyledFileLinkContainer = styled.div`
  color: var(--colorsActionMajorYin090);
  display: flex;
  align-items: center;
  overflow-x: hidden;
  overflow-y: visible;
  padding-right: var(--spacing150);

  ${StyledLink} {
    overflow: hidden;
  }

  ${StyledLink} a {
    overflow: hidden;
    display: flex;
    text-decoration: none;
  }

  [data-component="link-content"] {
    overflow: hidden;
    text-overflow: ellipsis;
    text-decoration: underline;
  }

  &&& ${StyledIcon} {
    display: inline-flex;
    justify-content: center;
    align-items: flex-start;
    width: 24px;
    height: 24px;

    // only apply these styles when the icon is not part of a Link component
    :not(${StyledLink} ${StyledIcon}) {
      color: var(--colorsUtilityYin065);
      padding-right: var(--spacing100);
    }
  }
`;

interface StyledFileUploadStatusRowProps {
  upperPadding?: boolean;
  lowerPadding?: boolean;
  onlyRow?: boolean;
}

export const StyledFileUploadStatusRow = styled.div<StyledFileUploadStatusRowProps>`
  display: flex;
  justify-content: space-between;
  ${({ onlyRow }) => (onlyRow ? "" : "align-items: baseline;")}
  padding-left: var(--spacing150);
  ${({ upperPadding }) =>
    upperPadding ? "padding-top: var(--spacing050);" : ""}
  ${({ lowerPadding }) =>
    lowerPadding ? "padding-bottom: var(--spacing125);" : ""}

  ${StyledTypography} {
    color: var(--colorsUtilityYin055);
  }
`;

interface StyledFileUploadStatusProps {
  hasError: boolean;
}

export const StyledFileUploadStatus = styled.div<StyledFileUploadStatusProps>`
  background-color: var(--colorsUtilityYang100);
  ${({ hasError }) => {
    const borderWidthToken = hasError ? "borderWidth200" : "borderWidth100";
    const colorToken = hasError
      ? "colorsSemanticNegative500"
      : "colorsUtilityMajor300";
    return css`
      border: var(--${borderWidthToken}) solid var(--${colorToken});
      ${hasError &&
      `&& ${StyledTypography} {
        color: var(--${colorToken});
        font-weight: 400;
      }`}
    `;
  }}
  border-radius: var(--borderRadius050);

  ${StyledProgressBar}, ${ProgressTrackerInnerBar} {
    border-radius: var(--borderRadius050);
    border: none;
  }

  ${StyledLoader} {
    display: flex;
  }

  ${StyledLoaderBar} {
    background-color: var(--colorsSemanticNeutral200);
  }

  ${LoaderBarInnerBar} {
    background-color: var(--colorsSemanticNeutral500);
    border-radius: var(--borderRadius050);
  }
`;
