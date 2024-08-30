import styled, { css } from "styled-components";
import { padding as paddingFn } from "styled-system";

import baseTheme from "../../style/themes/base";
import {
  calculateFormSpacingValues,
  calculateWidthValue,
} from "../../style/utils/form-style-utils";
import {
  StyledForm,
  StyledFormFooter,
  StyledFormContent,
} from "../form/form.style";
import {
  StyledHeaderContent,
  StyledHeading,
  StyledHeadingTitle,
} from "../heading/heading.style";
import StyledIconButton from "../icon-button/icon-button.style";
import {
  HORIZONTAL_PADDING,
  CONTENT_TOP_PADDING,
  CONTENT_BOTTOM_PADDING,
  DialogSizes,
} from "./dialog.config";
import { ContentPaddingInterface } from "./dialog.component";

const dialogSizes = {
  auto: "fit-content",
  "extra-small": "300px",
  small: "380px",
  "medium-small": "540px",
  medium: "750px",
  "medium-large": "850px",
  large: "960px",
  "extra-large": "1080px",
};

const calculatePaddingTopInnerContent = ({
  py,
  p,
}: {
  py?: ContentPaddingInterface["py"];
  p?: ContentPaddingInterface["p"];
}) =>
  [py, p].some((padding) => padding !== undefined)
    ? 0
    : `${CONTENT_TOP_PADDING}px`;

type StyledDialogProps = {
  topMargin: number;
  size?: DialogSizes;
  dialogHeight?: string;
  backgroundColor: string;
};

const StyledDialog = styled.div.attrs(
  ({ topMargin, size }: StyledDialogProps) => {
    const isDialogMaximised = size === "maximise";
    const isDialogMaximisedSmallViewport = topMargin === 32;
    const isDialogMaximisedLargeViewport = topMargin === 64;
    return {
      isDialogMaximised,
      isDialogMaximisedSmallViewport,
      isDialogMaximisedLargeViewport,
    };
  }
)<StyledDialogProps & ContentPaddingInterface>`
  box-shadow: var(--boxShadow300);
  display: flex;
  flex-direction: column;
  border-radius: var(--borderRadius200);
  position: fixed;
  top: 50%;
  z-index: ${({ theme }) => theme.zIndex.modal};
  max-height: ${({ topMargin }) => `calc(100vh - ${topMargin}px)`};
  ${({ isDialogMaximised }) => isDialogMaximised && "height: 100%"};

  &:focus {
    outline: none;
  }

  ${({ backgroundColor }) =>
    css`
      background-color: ${backgroundColor};
    `}

  ${({ size, topMargin }) =>
    size &&
    css`
      max-width: ${size === "maximise"
        ? `calc(100vw - ${topMargin}px)`
        : dialogSizes[size]};
      width: 100%;
    `}

  ${({ dialogHeight }) =>
    dialogHeight &&
    css`
      height: ${dialogHeight}px;
    `}

  /* We're overriding the max-height on the form content to account for a larger height when in a smaller viewport.
  TODO: Remove this upon the completion of FE-6643. */
  ${StyledForm} {
    ${({ isDialogMaximised, isDialogMaximisedSmallViewport }) =>
      isDialogMaximised &&
      css`
        ${isDialogMaximisedSmallViewport && "max-height: calc(100vh - 184px);"}
        height: 100%;
      `}

    padding-bottom: 0px;
    box-sizing: border-box;
  }

  ${StyledFormContent}.sticky {
    ${(props) => calculateFormSpacingValues(props, true)}
  }

  ${StyledFormFooter}.sticky {
    ${calculateWidthValue}
    ${(props) => calculateFormSpacingValues(props, false)}
    border-bottom-right-radius: var(--borderRadius200);
    border-bottom-left-radius: var(--borderRadius200);
  }

  > ${StyledIconButton} {
    margin: 0;
    position: absolute;
    right: 33px;
    top: 32px;
    z-index: 1;

    &:hover {
      color: #255bc7;
    }
  }
`;

type StyledDialogTitleProps = {
  showCloseIcon?: boolean;
  hasSubtitle?: boolean;
};

const StyledDialogTitle = styled.div<StyledDialogTitleProps>`
  background-color: var(--colorsUtilityYang100);
  padding: 23px ${HORIZONTAL_PADDING}px 0;
  border-bottom: 1px solid #ccd6db;
  border-top-right-radius: var(--borderRadius200);
  border-top-left-radius: var(--borderRadius200);
  ${({ showCloseIcon }) => showCloseIcon && "padding-right: 85px"};

  ${StyledHeaderContent} {
    align-items: baseline;
  }

  ${StyledHeading} {
    margin-bottom: 20px;

    ${StyledHeadingTitle} {
      color: var(--colorsUtilityYin090);
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: ${({ hasSubtitle }) => !hasSubtitle && "4px 0px"};
    }
  }
`;

const StyledDialogContent = styled.div<ContentPaddingInterface>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  /* Delegate handling overflow to child form if it has a sticky footer */
  &:has(${StyledFormContent}.sticky) {
    overflow-y: inherit;
  }

  width: 100%;
  flex: 1;
  padding: 0px ${HORIZONTAL_PADDING}px ${CONTENT_BOTTOM_PADDING}px;
  ${paddingFn}
`;

const StyledDialogInnerContent = styled.div<ContentPaddingInterface>`
  position: relative;
  flex: 1;
  padding-top: ${calculatePaddingTopInnerContent};
`;

StyledDialog.defaultProps = {
  theme: baseTheme,
};

StyledDialogContent.defaultProps = {
  theme: baseTheme,
};

export {
  StyledDialog,
  StyledDialogTitle,
  StyledDialogContent,
  StyledDialogInnerContent,
};
