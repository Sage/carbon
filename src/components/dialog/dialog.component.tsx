import React, { useRef, useImperativeHandle, forwardRef } from "react";

import createGuid from "../../__internal__/utils/helpers/guid";
import Modal, { ModalProps } from "../modal";
import Heading from "../heading";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";

import {
  StyledDialog,
  StyledDialogTitle,
  StyledDialogContent,
  DialogPositioner,
} from "./dialog.style";
import { DialogSizes } from "./dialog.config";

import FocusTrap, { CustomRefObject } from "../../__internal__/focus-trap";
import IconButton from "../icon-button";
import Icon from "../icon";
import useLocale from "../../hooks/__internal__/useLocale";
import useModalAria from "../../hooks/__internal__/useModalAria/useModalAria";

const PADDING_VALUES = [0, 1, 2, 3, 4, 5, 6, 7, 8] as const;
type PaddingValues = typeof PADDING_VALUES[number];

export interface ContentPaddingInterface {
  p?: PaddingValues;
  py?: PaddingValues;
  px?: PaddingValues;
}

export interface DialogProps extends ModalProps, TagProps {
  /** Custom class name  */
  className?: string;
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
  /* Disables auto focus functionality on child elements */
  disableAutoFocus?: boolean;
  /* Disables the focus trap when the dialog is open */
  disableFocusTrap?: boolean;
  /**
   * Function to replace focus trap
   * @ignore
   * @private
   */
  bespokeFocusTrap?: (
    ev: KeyboardEvent,
    firstElement?: HTMLElement,
    lastElement?: HTMLElement
  ) => void;
  /** Optional reference to an element meant to be focused on open */
  focusFirstElement?: CustomRefObject<HTMLElement> | HTMLElement | null;
  /** Optional selector to identify the focusable elements, if not provided a default selector is used */
  focusableSelectors?: string;
  /** Allows developers to specify a specific height for the dialog. */
  height?: string;
  /** Adds Help tooltip to Header */
  help?: string;
  /** A custom close event handler */
  onCancel?: (
    ev: React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLButtonElement>
  ) => void;
  /** Determines if the close icon is shown */
  showCloseIcon?: boolean;
  /** Data tag prop bag for close Button */
  closeButtonDataProps?: Pick<TagProps, "data-role" | "data-element">;
  /** Size of dialog, default size is 750px */
  size?: DialogSizes;
  /** Subtitle displayed at top of dialog. Its consumers' responsibility to set a suitable accessible name/description for the Dialog if they pass a node to subtitle prop. */
  subtitle?: React.ReactNode;
  /** Title displayed at top of dialog. Its consumers' responsibility to set a suitable accessible name/description for the Dialog if they pass a node to title prop. */
  title?: React.ReactNode;
  /** The ARIA role to be applied to the Dialog container */
  role?: string;
  /** Padding to be set on the Dialog content */
  contentPadding?: ContentPaddingInterface;
  /** Change the background color of the content to grey */
  greyBackground?: boolean;
  /** an optional array of refs to containers whose content should also be reachable by tabbing from the dialog */
  focusableContainers?: CustomRefObject<HTMLElement>[];
}

export type DialogHandle = {
  /** Programmatically focus on root container of Dialog. */
  focus: () => void;
} | null;

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
      role = "dialog",
      contentPadding = {},
      greyBackground = false,
      focusableContainers,
      topModalOverride,
      closeButtonDataProps,
      ...rest
    },
    ref
  ) => {
    const locale = useLocale();

    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef(null);
    const { current: titleId } = useRef(createGuid());
    const { current: subtitleId } = useRef(createGuid());

    const isTopModal = useModalAria(containerRef);

    useImperativeHandle<DialogHandle, DialogHandle>(
      ref,
      () => ({
        focus() {
          containerRef.current?.focus();
        },
      }),
      []
    );

    const closeIcon = showCloseIcon && onCancel && (
      <IconButton
        aria-label={locale.dialog.ariaLabels.close()}
        onClick={onCancel}
        disabled={disableClose}
        {...tagComponent("close", {
          "data-element": "close",
          ...closeButtonDataProps,
        })}
      >
        <Icon type="close" />
      </IconButton>
    );

    const dialogTitle = title && (
      <StyledDialogTitle
        showCloseIcon={showCloseIcon}
        hasSubtitle={!!subtitle}
        ref={titleRef}
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
      </StyledDialogTitle>
    );

    let dialogHeight = height;

    if (height && height.match(/px$/)) {
      dialogHeight = height.replace("px", "");
    }

    const dialogProps = {
      size,
      dialogHeight,
      "aria-labelledby":
        title && typeof title === "string" ? titleId : rest["aria-labelledby"],
      "aria-describedby":
        subtitle && typeof subtitle === "string"
          ? subtitleId
          : rest["aria-describedby"],
      "aria-label": rest["aria-label"],
    };

    return (
      <Modal
        open={open}
        onCancel={onCancel}
        disableEscKey={disableEscKey}
        disableClose={disableClose}
        className={className ? `${className} carbon-dialog` : "carbon-dialog"}
        topModalOverride={topModalOverride}
      >
        <FocusTrap
          autoFocus={!disableAutoFocus}
          focusFirstElement={focusFirstElement}
          bespokeTrap={bespokeFocusTrap}
          focusableSelectors={focusableSelectors}
          wrapperRef={containerRef}
          isOpen={open}
          additionalWrapperRefs={focusableContainers}
        >
          <DialogPositioner>
            <StyledDialog
              data-component={dataComponent}
              data-element={dataElement}
              data-role={dataRole}
              aria-modal={isTopModal ? true : undefined}
              ref={containerRef}
              {...dialogProps}
              role={role}
              tabIndex={-1}
              {...contentPadding}
              backgroundColor={
                greyBackground
                  ? "var(--colorsUtilityMajor025)"
                  : "var(--colorsUtilityYang100)"
              }
            >
              {dialogTitle}
              {closeIcon}
              <StyledDialogContent
                {...contentPadding}
                data-role="dialog-content"
                tabIndex={-1}
              >
                {children}
              </StyledDialogContent>
            </StyledDialog>
          </DialogPositioner>
        </FocusTrap>
      </Modal>
    );
  }
);

export default Dialog;
