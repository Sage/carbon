import styled, { css } from "styled-components";
import { padding as paddingFn, PaddingProps } from "styled-system";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import {
  StyledHeaderContent,
  StyledHeading,
  StyledHeadingTitle,
  StyledHeader,
} from "../heading/heading.style";
import StyledIconButton from "../icon-button/icon-button.style";
import { ContentPaddingInterface, DialogProps } from "./dialog.component";
import {
  StyledFormContent,
  StyledForm,
  StyledFormFooter,
} from "../form/form.style";
import StyledFullScreenHeading from "../../__internal__/full-screen-heading/full-screen-heading.style";

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

type StyledContentProps = ContentPaddingInterface & {
  disableContentPadding?: boolean;
  fullscreen?: boolean;
  hasHeader?: boolean;
};

type StyledDialogProps = Required<Pick<DialogProps, "size">> & {
  backgroundColor: string;
  dialogHeight?: string;
  fullscreen?: boolean;
  highlightVariant?: string;
  pagesStyling?: boolean;
};

type StyledDialogTitleProps = {
  fullscreen?: boolean;
  hasSubtitle?: boolean;
  showCloseIcon?: boolean;
};

const applyDefaultPadding = () => css`
  padding: 0 16px;

  @media screen and (min-width: 600px) {
    padding: 0 24px;
  }
  @media screen and (min-width: 960px) {
    padding: 0 32px;
  }
  @media screen and (min-width: 1260px) {
    padding: 0 40px;
  }
`;

const hasPaddingProps = (props: PaddingProps) => {
  return (
    props.padding !== undefined ||
    props.p !== undefined ||
    props.paddingTop !== undefined ||
    props.pt !== undefined ||
    props.paddingRight !== undefined ||
    props.pr !== undefined ||
    props.paddingBottom !== undefined ||
    props.pb !== undefined ||
    props.paddingLeft !== undefined ||
    props.pl !== undefined ||
    props.paddingX !== undefined ||
    props.px !== undefined ||
    props.paddingY !== undefined ||
    props.py !== undefined
  );
};

const applyContentPadding =
  (disableContentPadding = false) =>
  (props: PaddingProps) => {
    if (disableContentPadding) {
      return css`
        padding: 0;
        /* ${paddingFn} */
      `;
    }

    if (hasPaddingProps(props)) {
      return css`
        ${paddingFn}
      `;
    }

    return css`
      ${applyDefaultPadding()}
    `;
  };

const DialogPositioner = styled.div.attrs(applyBaseTheme)<{
  fullscreen?: boolean;
}>`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${({ theme, fullscreen }) =>
    fullscreen ? theme.zIndex.fullScreenModal : theme.zIndex.modal};

  ${({ fullscreen }) =>
    fullscreen &&
    css`
      justify-content: stretch;
      align-items: stretch;
    `}
`;

const StyledDialogContent = styled.div.attrs(applyBaseTheme)<
  StyledContentProps & ContentPaddingInterface
>`
  box-sizing: border-box;
  display: block;
  overflow-y: auto;
  width: 100%;

  ${({ disableContentPadding, fullscreen, hasHeader, ...props }) =>
    fullscreen
      ? css`
          flex: 1;
          ${applyContentPadding(disableContentPadding)(props)}

          &:has(${StyledForm}.sticky) {
            display: flex;
            flex-direction: column;
            overflow-y: hidden;
            padding: 0;

            ${StyledForm}.sticky {
              ${StyledFormContent} {
                ${applyContentPadding(disableContentPadding)(props)}
              }
            }
          }

          ${!hasHeader &&
          css`
            padding-top: 0;
          `}
        `
      : css`
          flex-grow: 1;
          padding: ${disableContentPadding ? "0px" : "24px 32px 30px"};
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
        `}
`;

function computePagesStyling({
  fullscreen,
  pagesStyling,
}: Pick<StyledDialogProps, "fullscreen" | "pagesStyling">) {
  if (fullscreen && pagesStyling) {
    return css`
      ${StyledDialogContent} {
        padding: 0;
      }

      > ${StyledIconButton} {
        right: 33px;
        top: 32px;
      }

      ${StyledFullScreenHeading} {
        padding: 32px 32px 0;
      }

      ${StyledHeading} {
        width: auto;
        padding-top: 4px;

        ${StyledHeader} {
          margin: 0 0 0 3px;
          box-sizing: content-box;
          width: 100%;
        }
      }
    `;
  }
  return "";
}

const StyledDialog = styled.div<StyledDialogProps & ContentPaddingInterface>`
  display: flex;
  flex-direction: column;
  position: relative;

  &:focus {
    outline: none;
  }

  ${({ backgroundColor, dialogHeight, fullscreen, highlightVariant, size }) =>
    fullscreen
      ? css`
          background-color: ${backgroundColor};
          height: 100%;
          width: 100%;
        `
      : css`
          box-shadow: var(--boxShadow300);
          border-radius: var(--borderRadius200);
          background-color: ${backgroundColor};

          ${highlightVariant &&
          highlightVariant === "ai" &&
          css`
            &::before {
              content: "";
              position: absolute;
              top: -8px;
              height: 100px;
              width: 100%;
              z-index: -1;
              background: linear-gradient(
                90deg,
                #00d639 0%,
                #00d6de 40%,
                #9d60ff 90%
              );
              border-radius: var(--borderRadius200) var(--borderRadius200) 0 0;
            }
          `}

          ${size === "maximise"
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

          ${dialogHeight &&
          css`
            height: ${dialogHeight}px;
          `}
        `}

  ${StyledHeaderContent} {
    align-items: baseline;
  }

  > ${StyledIconButton} {
    margin: 0;
    position: absolute;
    z-index: 1;

    ${({ fullscreen }) =>
      fullscreen
        ? css`
            right: 40px;
            top: 26px;
          `
        : css`
            right: 33px;
            top: 32px;

            &:hover {
              color: #255bc7;
            }
          `}
  }

  /* Legacy Pages component styling for fullscreen */
  ${({ fullscreen, pagesStyling }) =>
    computePagesStyling({ fullscreen, pagesStyling })}
`;

const StyledDialogTitle = styled.div<StyledDialogTitleProps>`
  ${({ fullscreen, hasSubtitle, showCloseIcon }) =>
    !fullscreen &&
    css`
      background-color: var(--colorsUtilityYang100);
      padding: 23px 32px 0;
      border-bottom: 1px solid #ccd6db;
      border-top-right-radius: var(--borderRadius200);
      border-top-left-radius: var(--borderRadius200);
      ${showCloseIcon && "padding-right: 85px"};

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
          padding: ${!hasSubtitle && "4px 0px"};
        }
      }
    `}
`;

export {
  DialogPositioner,
  StyledDialog,
  StyledDialogTitle,
  StyledDialogContent,
};
