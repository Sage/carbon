import React, { useCallback, useEffect, useRef, useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Icon from "../icon";
import tagComponent, {
  TagProps,
} from "../../__internal__/utils/helpers/tags/tags";
import {
  StyledToast,
  TypeIcon,
  StyledToastContent,
  ToastWrapper,
  StyledPortal,
} from "./toast.style";
import IconButton from "../icon-button";
import Events from "../../__internal__/utils/helpers/events";
import useLocale from "../../hooks/__internal__/useLocale";
import useModalManager from "../../hooks/__internal__/useModalManager";
import Logger from "../../__internal__/utils/logger";

type ToastVariants =
  | "error"
  | "info"
  | "success"
  | "warning"
  | "notice"
  | "neutral"
  | "notification";

type AlignOptions = "left" | "center" | "right";
type AlignYOptions = "top" | "center" | "bottom";

interface IconTypes {
  notification: "alert";
  neutral: "info";
  success: "tick_circle";
  error: "error";
  info: "info";
  warning: "warning";
  notice?: "none";
}

export interface ToastProps {
  /** Sets the horizontal alignment of the component. */
  align?: AlignOptions;
  /** Sets the vertical alignment of the component */
  alignY?: AlignYOptions;
  /** The rendered children of the component. */
  children: React.ReactNode;
  /** Customizes the appearance in the DLS theme */
  variant?: ToastVariants;
  /** Custom className */
  className?: string;
  /** Custom id  */
  id?: string;
  /** Component name */
  "data-component"?: string;
  /** Determines if the Toast is open. */
  open?: boolean;
  /** Callback for when dismissed. */
  onDismiss?: (
    ev?:
      | KeyboardEvent
      | React.KeyboardEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => void;
  /** Data tag prop bag for close Button */
  closeButtonDataProps?: Pick<TagProps, "data-role" | "data-element">;
  /** Time for Toast to remain on screen */
  timeout?: string | number;
  /** Centers the Toast on the screen */
  isCenter?: boolean;
  /** Target Portal ID where the Toast will render */
  targetPortalId?: string;
  /** Maximum toast width */
  maxWidth?: string;
  /** Disables auto focus functionality when the Toast has a close icon */
  disableAutoFocus?: boolean;
}

let isDeprecationWarningTriggered = false;

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      align,
      alignY,
      children,
      className,
      id,
      isCenter = true,
      maxWidth,
      onDismiss,
      open = true,
      targetPortalId,
      timeout,
      variant = "success",
      disableAutoFocus,
      closeButtonDataProps,
      ...restProps
    }: ToastProps,
    ref
  ) => {
    const isNotice = variant === "notice";
    const isNotification = variant === "notification";
    const locale = useLocale();

    const toastRef = useRef<HTMLDivElement | null>(null);
    const timer = useRef<null | ReturnType<typeof setTimeout>>(null);
    const toastContentNodeRef = useRef<HTMLDivElement | null>(null);
    const closeIconRef = useRef<HTMLButtonElement | null>(null);

    const focusedElementBeforeOpening = useRef<HTMLElement | null>(null);

    const [tabIndex, setTabIndex] = useState<number | undefined>(0);

    let refToPass = toastRef;
    if (ref && typeof ref === "object" && "current" in ref) {
      refToPass = ref;
    }

    if (isCenter !== undefined && !isDeprecationWarningTriggered) {
      isDeprecationWarningTriggered = true;
      Logger.deprecate(
        `isCenter prop in ${Toast.displayName} is being deprecated in favour of the align prop.`
      );
    }

    const dismissToast = useCallback(
      (ev: KeyboardEvent) => {
        if (onDismiss && Events.isEscKey(ev)) {
          ev.stopImmediatePropagation();
          onDismiss(ev);
        }
      },
      [onDismiss]
    );

    useModalManager({
      open,
      closeModal: dismissToast,
      modalRef: refToPass,
      topModalOverride: true,
    });

    useEffect(() => {
      /* istanbul ignore next */
      if (timer.current) clearTimeout(timer.current);

      if (!timeout || !open || !onDismiss) {
        return;
      }

      timer.current = setTimeout(() => onDismiss(), +timeout);
    }, [onDismiss, open, timeout]);

    useEffect(() => {
      if (!disableAutoFocus) {
        if (open) {
          // setTimeout needed as otherwise this runs before the ref is populated
          setTimeout(() => {
            focusedElementBeforeOpening.current = document.activeElement as HTMLElement | null;
            toastContentNodeRef.current?.focus();
          }, 0);
        } else if (focusedElementBeforeOpening.current) {
          focusedElementBeforeOpening.current.focus();
          focusedElementBeforeOpening.current = null;
          setTabIndex(0);
        }
      }
    }, [open, onDismiss, disableAutoFocus]);

    useEffect(() => {
      return () => {
        if (focusedElementBeforeOpening.current) {
          focusedElementBeforeOpening.current.focus();
        }
      };
    }, []);

    function renderCloseIcon() {
      if (!onDismiss) return null;

      return (
        <IconButton
          aria-label={locale.toast.ariaLabels.close()}
          onClick={onDismiss}
          ref={closeIconRef}
          {...tagComponent("close", {
            "data-element": "close",
            ...closeButtonDataProps,
          })}
        >
          <Icon type="close" />
        </IconButton>
      );
    }

    const iconToRender: IconTypes = {
      notification: "alert",
      neutral: "info",
      success: "tick_circle",
      error: "error",
      info: "info",
      warning: "warning",
    };

    const toastIcon = iconToRender[variant] || "none";

    function renderToastContent() {
      if (!open) return null;

      let toastVariant: ToastVariants = "success";

      if (!isNotice && !isNotification) {
        toastVariant = variant;
      }

      return (
        <CSSTransition
          enter
          classNames={isNotice ? "toast-alternative" : "toast"}
          timeout={{ appear: 1600, enter: 1500, exit: 500 }}
          nodeRef={toastContentNodeRef}
        >
          <StyledToast
            align={align}
            alignY={alignY}
            isNotice={isNotice}
            isNotification={isNotification}
            className={className}
            {...tagComponent(restProps["data-component"] || "toast", restProps)}
            isCenter={isCenter}
            variant={toastVariant}
            id={id}
            maxWidth={maxWidth}
            ref={toastContentNodeRef}
            {...(!disableAutoFocus && {
              tabIndex,
              onBlur: () => setTabIndex(undefined),
            })}
          >
            {!isNotice && (
              <TypeIcon variant={isNotification ? "info" : variant}>
                <Icon type={toastIcon} />
              </TypeIcon>
            )}
            <StyledToastContent isNotice={isNotice} isDismiss={!!onDismiss}>
              {children}
            </StyledToastContent>
            {renderCloseIcon()}
          </StyledToast>
        </CSSTransition>
      );
    }

    return (
      <StyledPortal
        id={targetPortalId}
        align={align}
        alignY={alignY}
        isCenter={isCenter}
        isNotice={isNotice}
      >
        <ToastWrapper
          align={align}
          isCenter={isCenter}
          ref={refToPass}
          isNotice={isNotice}
        >
          <TransitionGroup>{renderToastContent()}</TransitionGroup>
        </ToastWrapper>
      </StyledPortal>
    );
  }
);

Toast.displayName = "Toast";

export default Toast;
