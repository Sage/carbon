import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react";

import createGuid from "../../__internal__/utils/helpers/guid";
import Modal, { ModalProps } from "../modal";
import Heading from "../heading";
import { TagProps } from "../../__internal__/utils/helpers/tags/tags";
import useResizeObserver from "../../hooks/__internal__/useResizeObserver";

import {
  StyledDialog,
  StyledDialogTitle,
  StyledDialogContent,
  StyledDialogInnerContent,
} from "./dialog.style";
import { DialogSizes, TOP_MARGIN } from "./dialog.config";

import FocusTrap from "../../__internal__/focus-trap";
import IconButton from "../icon-button";
import Icon from "../icon";
import useLocale from "../../hooks/__internal__/useLocale";
import useIsStickyFooterForm from "../../hooks/__internal__/useIsStickyFooterForm";

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
  focusFirstElement?: React.MutableRefObject<HTMLElement | null>;
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
  /** Size of dialog, default size is 750px */
  size?: DialogSizes;
  /** Subtitle displayed at top of dialog */
  subtitle?: string;
  /** Title displayed at top of dialog */
  title?: React.ReactNode;
  /** The ARIA role to be applied to the Dialog container */
  role?: string;
  /** Padding to be set on the Dialog content */
  contentPadding?: ContentPaddingInterface;
  /** an optional array of refs to containers whose content should also be reachable by tabbing from the dialog */
  focusableContainers?: React.MutableRefObject<HTMLElement | null>[];
}

export const Dialog = ({
  className,
  children,
  open,
  height,
  size = "medium",
  title,
  disableEscKey,
  subtitle,
  disableAutoFocus = false,
  focusFirstElement,
  onCancel,
  showCloseIcon = true,
  bespokeFocusTrap,
  disableClose,
  help,
  role = "dialog",
  contentPadding = {},
  focusableContainers,
  ...rest
}: DialogProps) => {
  const locale = useLocale();

  const dialogRef = useRef<HTMLDivElement>(null);
  const innerContentRef = useRef(null);
  const titleRef = useRef(null);
  const listenersAdded = useRef(false);
  const { current: titleId } = useRef(createGuid());
  const { current: subtitleId } = useRef(createGuid());
  const hasStickyFooter = useIsStickyFooterForm(children);

  const centerDialog = useCallback(() => {
    /* istanbul ignore if */
    if (!dialogRef.current) {
      return;
    }

    const {
      width: dialogWidth,
      height: dialogHeight,
    } = dialogRef.current.getBoundingClientRect();

    let midPointY = window.innerHeight / 2;
    let midPointX = window.innerWidth / 2;

    midPointY -= dialogHeight / 2;
    midPointX -= dialogWidth / 2;

    if (midPointY < TOP_MARGIN) {
      midPointY = TOP_MARGIN;
    }

    if (midPointX < TOP_MARGIN) {
      midPointX = TOP_MARGIN;
    }

    dialogRef.current.style.top = `${midPointY}px`;
    dialogRef.current.style.left = `${midPointX}px`;
  }, []);

  useResizeObserver(innerContentRef, centerDialog, !open);

  const addListeners = useCallback(() => {
    /* istanbul ignore else */
    if (!listenersAdded.current) {
      window.addEventListener("resize", centerDialog);
      listenersAdded.current = true;
    }
  }, [centerDialog]);

  const removeListeners = useCallback(() => {
    if (listenersAdded.current) {
      window.removeEventListener("resize", centerDialog);
      listenersAdded.current = false;
    }
  }, [centerDialog]);

  useEffect(() => {
    if (open) {
      addListeners();
    }

    if (!open) {
      removeListeners();
    }

    return () => {
      removeListeners();
    };
  }, [open, addListeners, removeListeners]);

  useLayoutEffect(() => {
    if (open) {
      centerDialog();
    }
  }, [centerDialog, open, height]);

  const closeIcon = () => {
    if (!showCloseIcon || !onCancel) return null;

    return (
      <IconButton
        data-element="close"
        aria-label={locale.dialog.ariaLabels.close()}
        onAction={onCancel}
        disabled={disableClose}
      >
        <Icon type="close" />
      </IconButton>
    );
  };

  const dialogTitle = () => {
    if (!title) return null;

    return (
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
  };

  let dialogHeight = height;

  if (height && height.match(/px$/)) {
    dialogHeight = height.replace("px", "");
  }

  const dialogProps = {
    size,
    dialogHeight,
    "aria-labelledby":
      title && typeof title === "string" ? titleId : rest["aria-labelledby"],
    "aria-describedby": subtitle ? subtitleId : rest["aria-describedby"],
    "aria-label": rest["aria-label"],
  };

  const componentTags = {
    "data-component": rest["data-component"] || "dialog",
    "data-element": rest["data-element"],
    "data-role": rest["data-role"],
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      disableEscKey={disableEscKey}
      disableClose={disableClose}
      className={className ? `${className} carbon-dialog` : "carbon-dialog"}
      {...componentTags}
    >
      <FocusTrap
        autoFocus={!disableAutoFocus}
        focusFirstElement={focusFirstElement}
        bespokeTrap={bespokeFocusTrap}
        wrapperRef={dialogRef}
        isOpen={open}
        additionalWrapperRefs={focusableContainers}
      >
        <StyledDialog
          aria-modal
          ref={dialogRef}
          topMargin={TOP_MARGIN}
          {...dialogProps}
          data-component="dialog"
          data-element="dialog"
          data-role={rest["data-role"]}
          role={role}
          {...contentPadding}
        >
          {dialogTitle()}
          {closeIcon()}
          <StyledDialogContent
            {...contentPadding}
            hasStickyFooter={hasStickyFooter}
          >
            <StyledDialogInnerContent ref={innerContentRef} {...contentPadding}>
              {children}
            </StyledDialogInnerContent>
          </StyledDialogContent>
        </StyledDialog>
      </FocusTrap>
    </Modal>
  );
};

export default Dialog;
