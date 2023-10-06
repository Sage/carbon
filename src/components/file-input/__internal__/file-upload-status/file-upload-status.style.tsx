import styled, { css } from "styled-components";
import StyledTypography from "../../../typography/typography.style";
import StyledIcon from "../../../icon/icon.style";
import {
  StyledProgressBar,
  InnerBar as ProgressTrackerInnerBar,
} from "../../../progress-tracker/progress-tracker.style";
import {
  StyledLoader,
  InnerBar as LoaderBarInnerBar,
} from "../../../loader-bar/loader-bar.style";
import { StyledLink } from "../../../link/link.style";

export const StyledFileLinkContainer = styled.div`
  color: var(--colorsActionMajorYin090);
  display: flex;
  align-items: center;

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
}

export const StyledFileUploadStatusRow = styled.div<StyledFileUploadStatusRowProps>`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
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
        font-weight: 500;
      }`}
    `;
  }}
  border-radius: var(--borderRadius050);
  width: 100%;

  ${StyledProgressBar}, ${ProgressTrackerInnerBar} {
    border-radius: var(--borderRadius050);
    border: none;
  }

  ${StyledLoader} {
    display: flex;
  }

  ${LoaderBarInnerBar} {
    background-color: var(--colorsSemanticNeutral500);
  }
`;
