import React, {
  useRef,
  useImperativeHandle,
  forwardRef,
  RefObject,
} from "react";

import { DialogSizes } from "./dialog.config";
import {
  StyledDialog,
  StyledDialogTitle,
  StyledDialogContent,
  DialogPositioner,
} from "./dialog.style";

import Heading from "../heading";
import Icon from "../icon";
import IconButton from "../icon-button";
import Modal, { ModalProps } from "../modal";

import FocusTrap from "../../__internal__/focus-trap";
import FullScreenHeading from "../../__internal__/full-screen-heading";
import createGuid from "../../__internal__/utils/helpers/guid";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";
import Logger from "../../__internal__/utils/logger";

import useLocale from "../../hooks/__internal__/useLocale";
import useModalAria from "../../hooks/__internal__/useModalAria/useModalAria";

type PaddingValues = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface ContentPaddingInterface {
  p?: PaddingValues;
  py?: PaddingValues;
  px?: PaddingValues;
}

export interface DialogProps extends ModalProps, TagProps {
  /** Prop to specify the aria-describedby property of the Dialog component */
  "aria-describedby"?: string;
  /**
   * Prop to specify the aria-label of the Dialog component.
   * To be used only when the title prop is not defined, and the component is not labelled by any internal element.
   */
  "aria-label"?: string;
  /**
   * Prop to specify the aria-labelledby property of the Dialog component
   * To be used when the title prop is a custom React Node,
   * or the component is labelled by an internal element other than the title.
   */
  "aria-labelledby"?: string;
  /**
   * Function to replace focus trap
   * @ignore
   * @private
   */
  bespokeFocusTrap?: (
    ev: KeyboardEvent,
    firstElement?: HTMLElement,
    lastElement?: HTMLElement,
  ) => void;
  /** Child elements */
  children?: React.ReactNode;
  /**
   * @private
   * @ignore
   * @internal
   * Sets className for component. INTERNAL USE ONLY. */
  className?: string;
  /** Data tag prop bag for close Button */
  closeButtonDataProps?: Pick<TagProps, "data-role" | "data-element">;
  /** Padding to be set on the Dialog content */
  contentPadding?: ContentPaddingInterface;
  /** Reference to the scrollable content element */
  contentRef?: React.ForwardedRef<HTMLDivElement>;
  /** @private @internal @ignore */
  "data-component"?: string;
  /* Disables auto focus functionality on child elements */
  disableAutoFocus?: boolean;
  /** @deprecated Determines if the Dialog can be closed */
  disableClose?: boolean;
  /**
   * [Legacy] Flag to remove padding from content.
   * @deprecated Use `contentPadding` instead.
   */
  disableContentPadding?: boolean;
  /* Disables the focus trap when the dialog is open */
  disableFocusTrap?: boolean;
  /** an optional array of refs to containers whose content should also be reachable by tabbing from the dialog */
  focusableContainers?: RefObject<HTMLElement>[];
  /** Optional selector to identify the focusable elements, if not provided a default selector is used */
  focusableSelectors?: string;
  /** Optional reference to an element meant to be focused on open */
  focusFirstElement?: RefObject<HTMLElement> | HTMLElement | null;
  /** Whether the dialog is full-screen */
  fullscreen?: boolean;
  /** Change the background color of the content to grey */
  greyBackground?: boolean;
  /** Container for components to be displayed in the header */
  headerChildren?: React.ReactNode;
  /** Allows developers to specify a specific height for the dialog. */
  height?: string;
  /** Adds Help tooltip to Header */
  help?: string;
  /* Allows developers to specify a highlight variant. When fullscreen is true, then this prop does nothing. */
  highlightVariant?: string;
  /** A custom close event handler */
  onCancel?: (
    ev:
      | React.KeyboardEvent<HTMLElement>
      | KeyboardEvent
      | React.MouseEvent<HTMLButtonElement>,
  ) => void;
  /** @deprecated For legacy styling when used with Pages component. Do not use this unless using Pages within a full-screen Dialog */
  pagesStyling?: boolean;
  /** The ARIA role to be applied to the Dialog container */
  role?: string;
  /** Determines if the close icon is shown */
  showCloseIcon?: boolean;
  /** Size of dialog, default size is 750px */
  size?: DialogSizes;
  /** Subtitle displayed at top of dialog. Its consumers' responsibility to set a suitable accessible name/description for the Dialog if they pass a node to subtitle prop. */
  subtitle?: React.ReactNode;
  /** Title displayed at top of dialog. Its consumers' responsibility to set a suitable accessible name/description for the Dialog if they pass a node to title prop. */
  title?: React.ReactNode;
}

export type DialogHandle = {
  /** Programmatically focus on root container of Dialog. */
  focus: () => void;
} | null;

let deprecatedDisableCloseTrigger = false;
let deprecatedPagesStylingTrigger = false;

export const Dialog = forwardRef<DialogHandle, DialogProps>(
  (
    {
      className,
      "data-component": dataComponent = "dialog",
      "data-element": dataElement = "dialog",
      "data-role": dataRole,
      children,
      open,
      height,
      size = "medium",
      title,
      disableEscKey,
      subtitle,
      disableAutoFocus = false,
      focusFirstElement,
      focusableSelectors,
      onCancel,
      showCloseIcon = true,
      bespokeFocusTrap,
      disableClose,
      help,
      highlightVariant = "default",
      role = "dialog",
      contentPadding,
      greyBackground = false,
      focusableContainers,
      topModalOverride,
      closeButtonDataProps,
      restoreFocusOnClose = true,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
      "aria-label": ariaLabel,
      pagesStyling,
      headerChildren,
      disableContentPadding,
      contentRef,
      fullscreen = false,
      ...rest
    },
    ref,
  ) => {
    const locale = useLocale();

    const containerRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef(null);
    const titleRef = useRef(null);
    const { current: titleId } = useRef(createGuid());
    const { current: subtitleId } = useRef(createGuid());

    const isTopModal = useModalAria(containerRef);

    if (!deprecatedDisableCloseTrigger && disableClose) {
      deprecatedDisableCloseTrigger = true;
      Logger.deprecate(
        "The disableClose prop in Dialog is deprecated and will soon be removed.",
      );
    }

    if (!deprecatedPagesStylingTrigger && pagesStyling) {
      deprecatedPagesStylingTrigger = true;
      Logger.deprecate(
        "The pagesStyling prop in Dialog is deprecated and will soon be removed.",
      );
    }

    useImperativeHandle<DialogHandle, DialogHandle>(
      ref,
      () => ({
        focus() {
          containerRef.current?.focus();
        },
      }),
      [],
    );

    const closeIcon = showCloseIcon && onCancel && (
      <IconButton
        aria-label={locale.dialog.ariaLabels.close()}
        disabled={disableClose}
        onClick={onCancel}
        {...tagComponent("close", {
          "data-element": "close",
          ...closeButtonDataProps,
        })}
      >
        <Icon type="close" />
      </IconButton>
    );

    const dialogTitle = () => {
      if (fullscreen) {
        return (
          <FullScreenHeading
            hasContent={!!title}
            hasCloseButton={showCloseIcon}
            ref={headingRef}
          >
            {typeof title === "string" ? (
              <Heading
                data-element="dialog-title"
                title={title}
                titleId={titleId}
                subheader={subtitle}
                subtitleId={subtitleId}
                divider={false}
                help={help}
              />
            ) : (
              title
            )}
            {headerChildren}
          </FullScreenHeading>
        );
      }

      return (
        <StyledDialogTitle
          hasSubtitle={!!subtitle}
          ref={titleRef}
          showCloseIcon={showCloseIcon}
        >
          {typeof title === "string" ? (
            <Heading
              data-element="dialog-title"
              divider={false}
              help={help}
              subheader={subtitle}
              subtitleId={subtitleId}
              title={title}
              titleId={titleId}
            />
          ) : (
            title
          )}
        </StyledDialogTitle>
      );
    };

    let dialogHeight = height;

    if (height && height.match(/px$/)) {
      dialogHeight = height.replace("px", "");
    }

    const ariaProps = {
      "aria-describedby":
        subtitle && typeof subtitle === "string" ? subtitleId : ariaDescribedBy,
      "aria-label": ariaLabel,
      "aria-labelledby":
        title && typeof title === "string" ? titleId : ariaLabelledBy,
    };

    return (
      <Modal
        className={className ? `${className} carbon-dialog` : "carbon-dialog"}
        disableClose={disableClose}
        disableEscKey={disableEscKey}
        onCancel={onCancel}
        open={open}
        restoreFocusOnClose={restoreFocusOnClose}
        topModalOverride={topModalOverride}
        {...tagComponent("dialog", rest)}
        {...rest}
      >
        <FocusTrap
          additionalWrapperRefs={focusableContainers}
          autoFocus={!disableAutoFocus}
          bespokeTrap={bespokeFocusTrap}
          focusableSelectors={focusableSelectors}
          focusFirstElement={focusFirstElement}
          isOpen={open}
          wrapperRef={containerRef}
        >
          <DialogPositioner fullscreen={fullscreen}>
            <StyledDialog
              aria-modal={role === "dialog" && isTopModal ? true : undefined}
              {...ariaProps}
              backgroundColor={
                greyBackground
                  ? "var(--colorsUtilityMajor025)"
                  : "var(--colorsUtilityYang100)"
              }
              data-component={dataComponent}
              data-element={dataElement}
              data-role={dataRole}
              dialogHeight={dialogHeight}
              fullscreen={fullscreen}
              highlightVariant={highlightVariant}
              pagesStyling={pagesStyling}
              ref={containerRef}
              role={role}
              size={size}
              tabIndex={-1}
              {...contentPadding}
            >
              {title || headerChildren ? dialogTitle() : null}
              {closeIcon}
              <StyledDialogContent
                {...contentPadding}
                data-role="dialog-content"
                disableContentPadding={disableContentPadding}
                fullscreen={fullscreen}
                hasHeader={title !== undefined}
                tabIndex={-1}
                ref={contentRef}
              >
                {children}
              </StyledDialogContent>
            </StyledDialog>
          </DialogPositioner>
        </FocusTrap>
      </Modal>
    );
  },
);

export default Dialog;
