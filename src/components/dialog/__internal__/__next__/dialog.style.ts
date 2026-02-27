import styled, { css } from "styled-components";
import { padding as paddingFn, PaddingProps } from "styled-system";
import applyBaseTheme from "../../../../style/themes/apply-base-theme";
import StyledButton from "../../../button/__next__/button.style";
import Typography from "../../../typography";
import type { DialogProps } from "./dialog.component";
import {
  DIALOG_SIZE_CONFIG,
  Size,
  ContentPaddingInterface,
} from "./dialog.config";
import {
  StyledFormContent,
  StyledForm,
  StyledFormFooter,
} from "../../../form/form.style";

const dialogSizes = {
  small: DIALOG_SIZE_CONFIG.small.maxWidth,
  medium: DIALOG_SIZE_CONFIG.medium.maxWidth,
  large: DIALOG_SIZE_CONFIG.large.maxWidth,
} as const;

const smallScreenBreakpoint = "600px";

/** Transient size prop shared across all styled dialog sub-components */
type TransientSizeProps = {
  $size?: Size;
};

/** Transient prop to disable sticky behaviour on small screens */
type TransientDisableStickyProps = {
  $disableSticky?: boolean;
};

/** Base transient props shared by most styled dialog sub-components */
type SharedTransientProps = TransientSizeProps & TransientDisableStickyProps;

type StyledContentProps = ContentPaddingInterface &
  SharedTransientProps & {
    disableContentPadding?: boolean;
    hasHeader?: boolean;
    hasFooter?: boolean;
  };

type StyledDialogProps = SharedTransientProps &
  Pick<DialogProps, "greyBackground"> & {
    $size: Size;
    backgroundColor: string;
    dialogHeight?: string;
    $gradientKeyLine?: boolean;
  };

type StyledDialogTitleProps = SharedTransientProps &
  Pick<DialogProps, "showCloseIcon"> & {
    hasSubtitle?: boolean;
  };

type StyledDialogFooterProps = SharedTransientProps & {
  $sticky?: boolean;
};

type StyledDialogPositionerProps = SharedTransientProps & {
  $fullscreen?: boolean;
  $fullWidth?: boolean;
};

const applyDefaultPadding = () => css`
  padding: 0 var(--spacing200);

  @media screen and (min-width: 600px) {
    padding: 0 var(--spacing300);
  }
  @media screen and (min-width: 960px) {
    padding: 0 var(--spacing400);
  }
  @media screen and (min-width: 1260px) {
    padding: 0 var(--spacing500);
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

// istanbul ignore next
const applyContentPadding =
  (disableContentPadding = false) =>
  (props: PaddingProps) => {
    if (disableContentPadding) {
      return css`
        padding: 0;
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

const DialogPositioner = styled.div.attrs(
  applyBaseTheme,
)<StyledDialogPositionerProps>`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${({ theme, $size }) =>
    $size === "fullscreen" ? theme.zIndex.fullscreenModal : theme.zIndex.modal};

  ${({ $size }) =>
    $size === "fullscreen" &&
    css`
      justify-content: stretch;
      align-items: stretch;
    `}

  ${({ $disableSticky }) =>
    $disableSticky &&
    css`
      @media screen and (max-width: ${smallScreenBreakpoint}) {
        background-color: transparent;
      }
    `}
`;

const StyledDialogContent = styled.div.attrs(applyBaseTheme)<
  StyledContentProps & ContentPaddingInterface
>`
  box-sizing: border-box;
  display: block;
  overflow-y: auto;
  width: 100%;

  ${({ disableContentPadding, $size, hasHeader, hasFooter, ...props }) =>
    $size === "fullscreen"
      ? css`
          flex: 1;
          ${applyContentPadding(Boolean(disableContentPadding))(props)}

          &:has(${StyledForm}.sticky) {
            display: flex;
            flex-direction: column;
            overflow-y: hidden;
            padding: 0;

            ${StyledForm}.sticky {
              ${StyledFormContent} {
                ${applyContentPadding(Boolean(disableContentPadding))(props)}
              }
              ${StyledFormFooter} {
                background: var(--container-standard-bg-default, #fff);
              }
            }
          }

          ${!hasHeader &&
          css`
            padding-top: var(--spacing300);
          `}

          ${!hasFooter &&
          css`
            padding-bottom: var(--spacing300);
          `}
        `
      : css`
          flex-grow: 1;
          padding: ${disableContentPadding
            ? "0px"
            : "var(--spacing300) var(--spacing400)"};
          ${paddingFn}

          &:has(${StyledForm}.sticky) {
            display: flex;
            flex-direction: column;
            padding: 0;

            ${StyledForm}.sticky {
              ${StyledFormContent} {
                padding: var(--spacing300) var(--spacing400);
                ${paddingFn}
              }

              ${StyledFormFooter} {
                border-bottom-right-radius: var(
                  --global-radius-container-XL,
                  24px
                );
                border-bottom-left-radius: var(
                  --global-radius-container-XL,
                  24px
                );
              }
            }
          }
        `}

  ${({ $disableSticky }) =>
    $disableSticky &&
    css`
      @media screen and (max-width: ${smallScreenBreakpoint}) {
        overflow-y: visible;
        flex-grow: 0;

        ${StyledFormFooter} {
          position: static;
          box-shadow: none;
        }
      }
    `}
`;

const StyledDialogFooter = styled.div<StyledDialogFooterProps>`
  box-sizing: border-box;
  width: 100%;
  height: var(--global-size-3XL, 72px);
  padding-top: var(--global-space-comp-L, 16px);
  padding-bottom: var(--global-space-comp-L, 16px);
  padding-left: var(--global-space-comp-XL, 24px);
  padding-right: var(--global-space-comp-XL, 24px);
  border-bottom-right-radius: var(--global-radius-container-XL, 24px);
  border-bottom-left-radius: var(--global-radius-container-XL, 24px);
  background: var(--container-standard-bg-default, #fff);

  ${({ $sticky }) =>
    $sticky &&
    css`
      position: sticky;
      bottom: 0;
      background: var(--container-standard-bg-default, #fff);
      z-index: 1;
    `}

  ${({ $disableSticky }) =>
    $disableSticky &&
    css`
      @media screen and (max-width: ${smallScreenBreakpoint}) {
        position: static;
        border-radius: 0;
      }
    `}
`;

const StyledDialogTitle = styled.div<StyledDialogTitleProps>`
  background: var(--container-standard-bg-default, #fff);
  padding: var(--global-space-comp-XL, 24px);
  gap: var(--global-space-comp-L, 16px);
  border-bottom: 1px solid #a3adb5;
  border-top-right-radius: var(--borderRadius200);
  border-top-left-radius: var(--borderRadius200);

  ${({ showCloseIcon }) => showCloseIcon && "padding-right: 85px"};

  [data-element="dialog-title-help-wrapper"] {
    display: inline-flex;
    align-items: baseline;
  }

  [data-element="dialog-title-container"] {
    [data-element="dialog-title"] {
      color: var(--container-standard-txt-default, rgba(0, 0, 0, 0.95));
      display: block;
      ${({ hasSubtitle }: StyledDialogTitleProps) =>
        !hasSubtitle &&
        css`
          padding: 4px 0px;
        `}
    }
  }

  ${({ $disableSticky }) =>
    $disableSticky &&
    css`
      @media screen and (max-width: ${smallScreenBreakpoint}) {
        border-radius: 0;
        position: static;
      }
    `}
`;

const StyledDialog = styled.div<StyledDialogProps & ContentPaddingInterface>`
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: var(--global-radius-container-XL, 24px);

  &:focus {
    outline: none;
  }

  ${({ dialogHeight, $size, $gradientKeyLine }) =>
    $size === "fullscreen"
      ? css`
          box-shadow:
            0 3px 4px 0 rgba(0, 0, 0, 0.1),
            10px 10px 60px 0 rgba(0, 0, 0, 0.1);
          background: var(--container-standard-bg-alt, #f4f5f6);
          border-radius: var(--global-radius-container-XL, 24px);
          overflow: hidden;
          height: 100%;
          width: 100%;
        `
      : css`
          box-shadow:
            0 3px 4px 0 rgba(0, 0, 0, 0.1),
            10px 10px 60px 0 rgba(0, 0, 0, 0.1);
          border-radius: var(--global-radius-container-XL, 24px);
          background: var(--container-standard-bg-default, #fff);
          max-height: 90vh;
          width: 100%;

          ${$size === "small" &&
          css`
            min-width: 288px;
            max-width: var(--container-size-dialog-maxW-S, 540px);
          `}

          ${$size === "medium" &&
          css`
            min-width: var(--container-size-dialog-maxW-S, 540px);
            max-width: var(--container-size-dialog-maxW-M, 850px);
          `}

          ${$size === "large" &&
          css`
            min-width: var(--container-size-dialog-maxW-M, 850px);
            max-width: var(--container-size-dialog-maxW-L, 1080px);
          `}

          ${$gradientKeyLine &&
          css`
            &::before {
              content: "";
              position: absolute;
              top: -8px;
              height: 100px;
              width: 100%;
              z-index: -1;
              /* Hex values are a temporary measure until Fusion DS tokens are available */
              background: linear-gradient(
                90deg,
                #00d639 0%,
                #00d6de 40%,
                #9d60ff 90%
              );
              border-radius: var(--borderRadius200) var(--borderRadius200) 0 0;
            }
          `}

          @media screen and (max-width: ${dialogSizes[$size]}) {
            max-width: calc(100% - var(--spacing400));
          }

          ${dialogHeight &&
          css`
            height: ${dialogHeight}px;
          `}
        `}

  > ${StyledButton} {
    margin: 0;
    position: absolute;
    z-index: 1;

    ${({ $size }) =>
      $size === "fullscreen"
        ? css`
            right: 40px;
            top: 26px;
          `
        : css`
            right: 33px;
            top: 32px;
          `}
  }

  ${({ $disableSticky }) =>
    $disableSticky &&
    css`
      @media screen and (max-width: ${smallScreenBreakpoint}) {
        width: 100%;
        max-width: 100%;
        min-width: 100%;
        border-radius: 0;
        max-height: 100%;
        height: 100%;
        overflow-y: auto;
      }
    `}
`;

const StyledSubtitle = styled(Typography)`
  font-family: var(--core-fontFamilies-subheading, "Sage UI");
  flex-basis: 100%;
  width: 100%;
  margin-top: 5px;
  color: var(--container-standard-txt-alt, rgba(0, 0, 0, 0.65));
  font-size: var(--core-fontSize-static-large-step1, 16px);
  font-style: normal;
  font-weight: 500;
  line-height: 125%;
`;

export {
  DialogPositioner,
  StyledDialog,
  StyledDialogTitle,
  StyledDialogContent,
  StyledDialogFooter,
  StyledSubtitle,
  dialogSizes,
  smallScreenBreakpoint,
};
