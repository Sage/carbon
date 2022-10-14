import styled, { css } from "styled-components";
import { padding as paddingFn } from "styled-system";

import baseTheme from "../../style/themes/base";
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
  auto: "auto",
  "extra-small": "300px",
  small: "380px",
  "medium-small": "540px",
  medium: "750px",
  "medium-large": "850px",
  large: "960px",
  "extra-large": "1080px",
};

interface PaddingValues {
  paddingTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
  padding: number;
}

const calculateWidthValue = (props: ContentPaddingInterface) => {
  const { paddingLeft, paddingRight, padding }: PaddingValues = paddingFn(
    props
  );
  const paddingValue = paddingLeft ?? paddingRight ?? padding;

  return paddingValue === undefined ? HORIZONTAL_PADDING : paddingValue;
};

const calculateFormSpacingValues = (
  props: ContentPaddingInterface,
  isFormContent: boolean
) => {
  const {
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    padding,
  }: PaddingValues = paddingFn(props);

  const spacingTopValue = paddingTop ?? padding ?? CONTENT_TOP_PADDING;
  const spacingRightValue = paddingRight ?? padding ?? HORIZONTAL_PADDING;
  const spacingBottomValue = paddingBottom ?? padding ?? CONTENT_BOTTOM_PADDING;
  const spacingLeftValue = paddingLeft ?? padding ?? HORIZONTAL_PADDING;

  const setNegativeValue = (value: number) => `calc(-1px * ${value})`;

  return {
    "margin-left": setNegativeValue(spacingLeftValue),
    "margin-right": setNegativeValue(spacingRightValue),

    ...(isFormContent && {
      "margin-top": setNegativeValue(spacingTopValue),
      "padding-top": spacingTopValue,
      "padding-bottom": spacingBottomValue,
      "padding-left": spacingLeftValue,
      "padding-right": spacingRightValue,
    }),
    ...(!isFormContent && {
      "margin-bottom": setNegativeValue(spacingBottomValue),
      bottom: setNegativeValue(spacingBottomValue),
    }),
  };
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
};

const StyledDialog = styled.div<StyledDialogProps & ContentPaddingInterface>`
  background-color: var(--colorsUtilityMajor025);
  box-shadow: var(--boxShadow300);
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  z-index: ${({ theme }) => theme.zIndex.modal};
  max-height: ${({ topMargin }) => `calc(100vh - ${topMargin}px)`};

  &:focus {
    outline: none;
  }

  ${({ size }) =>
    size &&
    css`
      width: ${dialogSizes[size]};
    `}

  ${({ dialogHeight }) =>
    dialogHeight &&
    css`
      height: ${dialogHeight}px;
    `}

  ${StyledForm} {
    padding-bottom: 0px;
    box-sizing: border-box;
  }

  ${StyledFormContent}.sticky {
    ${(props) => calculateFormSpacingValues(props, true)}
  }

  ${StyledFormFooter}.sticky {
    width: calc(100% + (2px * ${calculateWidthValue}));
    ${(props) => calculateFormSpacingValues(props, false)}
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

const StyledDialogContent = styled.div<
  ContentPaddingInterface & { hasStickyFooter: boolean }
>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  ${({ hasStickyFooter }) =>
    !hasStickyFooter &&
    css`
      overflow-y: auto;
    `}
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
