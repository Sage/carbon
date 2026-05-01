import styled, { css } from "styled-components";
import { padding as paddingFn, PaddingProps } from "styled-system";
import applyBaseTheme from "../../../../style/themes/apply-base-theme";
import StyledButton from "../../../button/__next__/button.style";
import Typography from "../../../typography";
import type { DialogProps } from "./dialog.component";
import {
  DIALOG_SIZE_CONFIG,
  DIALOG_MIN_WIDTH,
  Size,
  ContentPaddingInterface,
} from "./dialog.config";
import {
  StyledFormContent,
  StyledForm,
  StyledFormFooter,
} from "../../../form/form.style";
import StyledFullScreenHeading from "../../../../__internal__/full-screen-heading/full-screen-heading.style";

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
  $disableStickyOnSmallScreen?: boolean;
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
    pagesStyling?: boolean;
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
};

const applyDefaultPadding = () => css`
  padding: 0 var(--global-space-layout-2-xs);

  @media screen and (min-width: 600px) {
    padding: 0 var(--global-space-layout-xs);
  }
  @media screen and (min-width: 960px) {
    padding: 0 var(--global-space-layout-s);
  }
  @media screen and (min-width: 1260px) {
    padding: 0 var(--global-space-layout-m);
  }
`;

// istanbul ignore next
const applyContentPadding =
  (disableContentPadding = false) =>
  (props: PaddingProps) => {
    if (disableContentPadding) {
      return css`
        padding: 0;
      `;
    }

    return css`
      ${applyDefaultPadding()}

      ${paddingFn(props)}
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
  z-index: ${({ $size }) =>
    $size === "fullscreen"
      ? `var(--carbon-zindex-full-screen-modal)`
      : `var(--carbon-zindex-modal)`};

  ${({ $size }) =>
    $size === "fullscreen" &&
    css`
      justify-content: stretch;
      align-items: stretch;
    `}

  ${({ $disableStickyOnSmallScreen }) =>
    $disableStickyOnSmallScreen &&
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
              ${StyledFormFooter} {
                border-top: 1px solid #a3adb5;
                box-shadow:
                  0 -2px 4px 0 rgba(0, 0, 0, 0.1),
                  0 -10px 60px 0 rgba(0, 0, 0, 0.1);
                background: var(--container-standard-bg-default);
              }
            }
          }

          ${!hasHeader &&
          css`
            padding-top: var(--global-space-layout-xs);
          `}

          ${!hasFooter &&
          css`
            padding-bottom: var(--global-space-layout-xs);
          `}
        `
      : css`
          flex-grow: 1;
          padding: ${disableContentPadding
            ? "0px"
            : "var(--global-space-layout-xs) var(--global-space-layout-s)"};
          ${paddingFn}

          &:has(${StyledForm}.sticky) {
            display: flex;
            flex-direction: column;
            padding: 0;

            ${StyledForm}.sticky {
              ${StyledFormContent} {
                padding: var(--global-space-layout-xs)
                  var(--global-space-layout-s);
                ${paddingFn}
              }

              ${StyledFormFooter} {
                border-top: 1px solid #a3adb5;
                box-shadow:
                  0 -2px 4px 0 rgba(0, 0, 0, 0.1),
                  0 -10px 60px 0 rgba(0, 0, 0, 0.1);
                border-bottom-right-radius: var(--global-radius-container-xl);
                border-bottom-left-radius: var(--global-radius-container-xl);
              }
            }
          }
        `}

  ${({ $disableStickyOnSmallScreen }) =>
    $disableStickyOnSmallScreen &&
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
  height: var(--global-size-3-xl);
  padding-top: var(--global-space-comp-l);
  padding-bottom: var(--global-space-comp-l);
  padding-left: var(--global-space-comp-xl);
  padding-right: var(--global-space-comp-xl);
  border-bottom-right-radius: var(--global-radius-container-xl);
  border-bottom-left-radius: var(--global-radius-container-xl);
  background: var(--container-standard-bg-default);

  ${({ $sticky }) =>
    $sticky &&
    css`
      position: sticky;
      bottom: 0;
      background: var(--container-standard-bg-default);
      z-index: 1;
      border-top: 1px solid #a3adb5;
      box-shadow:
        0 -2px 4px 0 rgba(0, 0, 0, 0.1),
        0 -10px 60px 0 rgba(0, 0, 0, 0.1);
    `}

  ${({ $disableStickyOnSmallScreen }) =>
    $disableStickyOnSmallScreen &&
    css`
      @media screen and (max-width: ${smallScreenBreakpoint}) {
        position: static;
        border-radius: 0;
      }
    `}
`;

const StyledDialogTitle = styled.div<StyledDialogTitleProps>`
  background: var(--container-standard-bg-default);
  padding: var(--global-space-comp-xl);
  gap: var(--global-space-comp-l);
  border-bottom: 1px solid #a3adb5;
  border-top-right-radius: var(--global-radius-container-xl);
  border-top-left-radius: var(--global-radius-container-xl);

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

  ${({ $disableStickyOnSmallScreen }) =>
    $disableStickyOnSmallScreen &&
    css`
      @media screen and (max-width: ${smallScreenBreakpoint}) {
        border-radius: 0;
        position: static;
      }
    `}
`;

function computePagesStyling({
  $size,
  pagesStyling,
}: Pick<StyledDialogProps, "$size" | "pagesStyling">) {
  // Legacy Pages component styling for fullscreen, to be removed in near future.
  // istanbul ignore next
  if ($size === "fullscreen" && pagesStyling) {
    return css`
      ${StyledDialogContent} {
        padding: 0;
      }

      > ${StyledButton} {
        right: 33px;
        top: 32px;
      }

      ${StyledFullScreenHeading} {
        padding: 32px 32px 0;
      }

      [data-element="dialog-title-container"] {
        width: auto;
        padding-top: 4px;

        [data-element="dialog-title"] {
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
  border-radius: var(--global-radius-container-xl);

  &:focus {
    outline: none;
  }

  ${({ dialogHeight, $size, $gradientKeyLine, backgroundColor }) =>
    $size === "fullscreen"
      ? css`
          box-shadow:
            0 3px 4px 0 rgba(0, 0, 0, 0.1),
            10px 10px 60px 0 rgba(0, 0, 0, 0.1);
          background: var(--container-standard-bg-alt);
          border-radius: var(--global-radius-container-xl);
          overflow: hidden;
          height: 100%;
          width: 100%;
        `
      : css`
          box-shadow:
            0 3px 4px 0 rgba(0, 0, 0, 0.1),
            10px 10px 60px 0 rgba(0, 0, 0, 0.1);
          border-radius: var(--global-radius-container-xl);
          background: ${backgroundColor};
          max-height: 90vh;
          width: 100%;

          ${$size === "small" &&
          css`
            min-width: 288px;
            max-width: var(--container-size-dialog-maxwidth-s);
          `}

          ${$size === "medium" &&
          css`
            min-width: 540px;
            max-width: var(--container-size-dialog-maxwidth-m);

            @media screen and (max-width: ${DIALOG_SIZE_CONFIG.small
                .maxWidth}) {
              min-width: ${DIALOG_MIN_WIDTH};
            }
          `}

          ${$size === "large" &&
          css`
            min-width: 850px;
            max-width: var(--container-size-dialog-maxwidth-l);

            @media screen and (max-width: ${DIALOG_SIZE_CONFIG.medium
                .maxWidth}) {
              min-width: ${DIALOG_MIN_WIDTH};
            }
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
              border-radius: var(--global-radius-container-xl)
                var(--global-radius-container-xl) 0 0;
            }
          `}

          @media screen and (max-width: ${dialogSizes[$size]}) {
            max-width: calc(100% - var(--global-space-comp-2-xl));
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

  ${({ $disableStickyOnSmallScreen }) =>
    $disableStickyOnSmallScreen &&
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

  /* Legacy Pages component styling for fullscreen */
  ${({ $size, pagesStyling }) => computePagesStyling({ $size, pagesStyling })}
`;

const StyledSubtitle = styled(Typography)`
  font: var(--global-font-static-subheading-m);
  flex-basis: 100%;
  width: 100%;
  margin-top: 5px;
  color: var(--container-standard-txt-alt);
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
