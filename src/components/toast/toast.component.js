import React, { useCallback, useEffect, useMemo, useRef } from "react";
import classNames from "classnames";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";
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

const Toast = React.forwardRef(
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
      variant,
      disableAutoFocus,
      ...restProps
    },
    ref
  ) => {
    const isNotice = variant === "notice";
    const locale = useLocale();

    const toastRef = useRef();
    const timer = useRef();
    const toastContentNodeRef = useRef();
    const closeIconRef = useRef();

    const focusedElementBeforeOpening = useRef();

    const refToPass = ref || toastRef;

    const componentClasses = useMemo(() => {
      return classNames(className);
    }, [className]);

    const dismissToast = useCallback(
      (ev) => {
        if (onDismiss && Events.isEscKey(ev)) {
          ev.stopImmediatePropagation();
          onDismiss(ev);
        }
      },
      [onDismiss]
    );

    useModalManager(open, dismissToast, refToPass);

    useEffect(() => {
      clearTimeout(timer.current);

      if (!timeout || !open || !onDismiss) {
        return;
      }

      timer.current = setTimeout(() => onDismiss(), timeout);
    }, [onDismiss, open, timeout]);

    useEffect(() => {
      if (onDismiss && !disableAutoFocus) {
        if (open) {
          focusedElementBeforeOpening.current = document.activeElement;
          closeIconRef.current?.focus();
        } else if (focusedElementBeforeOpening.current) {
          focusedElementBeforeOpening.current.focus();
          focusedElementBeforeOpening.current = undefined;
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
          onAction={onDismiss}
          ref={closeIconRef}
        >
          <Icon type="close" />
        </IconButton>
      );
    }

    function renderToastContent() {
      if (!open) return null;

      const toastProps = {
        isCenter,
        variant: variant || "success",
        id,
        maxWidth,
      };

      return (
        <CSSTransition
          enter
          classNames={isNotice ? "toast-alternative" : "toast"}
          timeout={{ appear: 1600, enter: 1500, exit: 500 }}
          nodeRef={toastContentNodeRef}
        >
          <ToastStyle
            isNotice={isNotice}
            className={componentClasses}
            {...tagComponent(restProps["data-component"] || "toast", restProps)}
            {...toastProps}
            ref={toastContentNodeRef}
          >
            {!isNotice && (
              <TypeIcon variant={toastProps.variant}>
                <Icon type={toastProps.variant} />
              </TypeIcon>
            )}
            <ToastContentStyle
              isNotice={isNotice}
              variant={toastProps.variant}
              isDismiss={onDismiss}
            >
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

Toast.propTypes = {
  /** Customizes the appearance in the DLS theme */
  variant: PropTypes.oneOf(["error", "info", "success", "warning", "notice"]),
  /** Custom className */
  className: PropTypes.string,
  /** Custom id  */
  id: PropTypes.string,
  /** Component name */
  "data-component": PropTypes.string,
  /** The rendered children of the component. */
  children: PropTypes.node,
  /** Determines if the Toast is open. */
  open: PropTypes.bool,
  /** Callback for when dismissed. */
  onDismiss: PropTypes.func,
  /** Time for Toast to remain on screen */
  timeout: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Centers the Toast on the screen */
  isCenter: PropTypes.bool,
  /** Target Portal ID where the Toast will render */
  targetPortalId: PropTypes.string,
  /** Maximum toast width */
  maxWidth: PropTypes.string,
  /** Disables auto focus functionality when the Toast has a close icon */
  disableAutoFocus: PropTypes.bool,
};

export default Toast;
