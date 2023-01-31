import React, { useCallback, useEffect, useRef, useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Icon from "../icon";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import {
  ToastStyle,
  TypeIcon,
  ToastContentStyle,
  ToastWrapper,
  StyledPortal,
} from "./toast.style";
import IconButton from "../icon-button";
import Events from "../../__internal__/utils/helpers/events";
import useLocale from "../../hooks/__internal__/useLocale";
import useModalManager from "../../hooks/__internal__/useModalManager";

type ToastVariants = "error" | "info" | "success" | "warning" | "notice";

export interface ToastProps {
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

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
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
      ...restProps
    }: ToastProps,
    ref
  ) => {
    const isNotice = variant === "notice";
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

    const dismissToast = useCallback(
      (ev: KeyboardEvent) => {
        if (onDismiss && Events.isEscKey(ev)) {
          ev.stopImmediatePropagation();
          onDismiss(ev);
        }
      },
      [onDismiss]
    );

    useModalManager(open, dismissToast, refToPass);

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
          focusedElementBeforeOpening.current = document.activeElement as HTMLElement | null;
          toastContentNodeRef.current?.focus();
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
          data-element="close"
          onClick={onDismiss}
          ref={closeIconRef}
        >
          <Icon type="close" />
        </IconButton>
      );
    }

    function renderToastContent() {
      if (!open) return null;

      let toastVariant;

      if (variant !== "notice") {
        toastVariant = variant;
      }

      return (
        <CSSTransition
          enter
          classNames={isNotice ? "toast-alternative" : "toast"}
          timeout={{ appear: 1600, enter: 1500, exit: 500 }}
          nodeRef={toastContentNodeRef}
        >
          <ToastStyle
            isNotice={isNotice}
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
            {variant !== "notice" && (
              <TypeIcon variant={variant}>
                <Icon type={variant} />
              </TypeIcon>
            )}
            <ToastContentStyle isNotice={isNotice} isDismiss={!!onDismiss}>
              {children}
            </ToastContentStyle>
            {renderCloseIcon()}
          </ToastStyle>
        </CSSTransition>
      );
    }

    return (
      <StyledPortal id={targetPortalId} isCenter={isCenter} isNotice={isNotice}>
        <ToastWrapper isCenter={isCenter} ref={refToPass} isNotice={isNotice}>
          <TransitionGroup>{renderToastContent()}</TransitionGroup>
        </ToastWrapper>
      </StyledPortal>
    );
  }
);

Toast.displayName = "Toast";

export default Toast;
