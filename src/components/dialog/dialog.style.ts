import styled, { css } from "styled-components";
import { padding as paddingFn } from "styled-system";
import baseTheme from "../../style/themes/base";
import {
  StyledHeaderContent,
  StyledHeading,
  StyledHeadingTitle,
} from "../heading/heading.style";
import StyledIconButton from "../icon-button/icon-button.style";
import { ContentPaddingInterface, DialogProps } from "./dialog.component";
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

type StyledDialogProps = Required<Pick<DialogProps, "size">> & {
  dialogHeight?: string;
  backgroundColor: string;
};

const DialogPositioner = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${({ theme }) => theme.zIndex.modal};
`;

const StyledDialog = styled.div<StyledDialogProps & ContentPaddingInterface>`
  box-shadow: var(--boxShadow300);
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: var(--borderRadius200);

  ${({ size }) =>
    size === "maximise"
      ? css`
          height: calc(100% - var(--spacing400));
          width: calc(100% - var(--spacing400));

          @media screen and (min-width: 960px) {
            height: calc(100% - var(--spacing800));
            width: calc(100% - var(--spacing800));
          }
        `
      : css`
          max-height: 90vh;
          max-width: ${dialogSizes[size]};
          width: 100%;
        `};

  &:focus {
    outline: none;
  }

  ${({ backgroundColor }) =>
    css`
      background-color: ${backgroundColor};
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
  padding: 23px 32px 0;
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
  display: block;
  overflow-y: auto;
  width: 100%;
  flex-grow: 1;

  padding: 24px 32px 30px;
  ${paddingFn}

  &:has(${StyledForm}.sticky) {
    display: flex;
    flex-direction: column;
    padding: 0;

    ${StyledForm}.sticky {
      ${StyledFormContent} {
        padding: 24px 32px 30px;
        ${paddingFn}
      }

      ${StyledFormFooter} {
        border-bottom-right-radius: var(--borderRadius200);
        border-bottom-left-radius: var(--borderRadius200);
      }
    }
  }
`;

DialogPositioner.defaultProps = {
  theme: baseTheme,
};

StyledDialogContent.defaultProps = {
  theme: baseTheme,
};

export {
  DialogPositioner,
  StyledDialog,
  StyledDialogTitle,
  StyledDialogContent,
};
