import styled, { css } from "styled-components";
import baseTheme from "../../style/themes/base";
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
import resolvePaddingSides from "../../style/utils/resolve-padding-sides";
import {
  StyledFormContent,
  StyledForm,
  StyledFormFooter,
} from "../form/form.style";

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

type StyledDialogProps = {
  topMargin: number;
  size?: DialogSizes;
  dialogHeight?: string;
  backgroundColor: string;
};

const StyledDialog = styled.div.attrs(({ size }: StyledDialogProps) => {
  const isDialogMaximised = size === "maximise";
  return {
    isDialogMaximised,
  };
})<StyledDialogProps & ContentPaddingInterface>`
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

const StyledDialogContent = styled.div<ContentPaddingInterface>((props) => {
  const {
    paddingTop = `${CONTENT_TOP_PADDING}px`,
    paddingRight = `${HORIZONTAL_PADDING}px`,
    paddingBottom = `${CONTENT_BOTTOM_PADDING}px`,
    paddingLeft = `${HORIZONTAL_PADDING}px`,
  } = resolvePaddingSides(props);

  const negate = (value: string) => `calc(-1 * ${value})`;

  return css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow-y: auto;

    width: 100%;
    flex: 1;

    ${StyledForm}.sticky {
      margin-top: ${negate(paddingTop)};
      margin-right: ${negate(paddingRight)};
      margin-bottom: ${negate(paddingBottom)};
      margin-left: ${negate(paddingLeft)};

      ${StyledFormContent} {
        padding: ${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft};
      }

      ${StyledFormFooter} {
        border-bottom-right-radius: var(--borderRadius200);
        border-bottom-left-radius: var(--borderRadius200);
      }
    }

    padding: ${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft};
  `;
});

StyledDialog.defaultProps = {
  theme: baseTheme,
};

StyledDialogContent.defaultProps = {
  theme: baseTheme,
};

export { StyledDialog, StyledDialogTitle, StyledDialogContent };
