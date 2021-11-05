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
import ModalManager from "../modal/__internal__/modal-manager";
import Events from "../../__internal__/utils/helpers/events";

const Toast = ({
  as = "warning",
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
  ...restProps
}) => {
  const toastRef = useRef();
  const timer = useRef();

  const componentClasses = useMemo(() => {
    return classNames(className);
  }, [className]);

  const dismissToast = useCallback(
    (ev) => {
      const isTopmost = ModalManager.isTopmost(toastRef.current);

      if (onDismiss && Events.isEscKey(ev) && isTopmost) {
        ev.stopImmediatePropagation();
        onDismiss(ev);
      }
    },
    [onDismiss]
  );

  useEffect(() => {
    const currentElement = toastRef.current;

    ModalManager.addModal(currentElement);
    document.addEventListener("keyup", dismissToast);

    return () => {
      ModalManager.removeModal(currentElement);
      document.removeEventListener("keyup", dismissToast);
    };
  }, [dismissToast]);

  useEffect(() => {
    clearTimeout(timer.current);

    if (!timeout || !open || !onDismiss) {
      return;
    }

    timer.current = setTimeout(() => onDismiss(), timeout);
  }, [onDismiss, open, timeout]);

  function renderCloseIcon() {
    if (!onDismiss) return null;

    return (
      <IconButton data-element="close" onAction={onDismiss}>
        <Icon type="close" />
      </IconButton>
    );
  }

  function renderToastContent() {
    if (!open) return null;

    const toastProps = {
      isCenter,
      variant: variant || as,
      id,
      maxWidth,
    };

    return (
      <CSSTransition
        enter
        classNames="toast"
        timeout={{ appear: 1600, enter: 1500, exit: 500 }}
      >
        <ToastStyle
          className={componentClasses}
          {...tagComponent(restProps["data-component"] || "toast", restProps)}
          {...toastProps}
        >
          <TypeIcon variant={toastProps.variant}>
            <Icon type={toastProps.variant} />
          </TypeIcon>
          <ToastContentStyle variant={toastProps.variant} isDismiss={onDismiss}>
            {children}
          </ToastContentStyle>
          {renderCloseIcon()}
        </ToastStyle>
      </CSSTransition>
    );
  }

  return (
    <StyledPortal id={targetPortalId} isCenter={isCenter}>
      <ToastWrapper isCenter={isCenter} ref={toastRef}>
        <TransitionGroup>{renderToastContent()}</TransitionGroup>
      </ToastWrapper>
    </StyledPortal>
  );
};

Toast.propTypes = {
  /** Customizes the appearance in the DLS theme */
  variant: PropTypes.oneOf([
    "default",
    "error",
    "help",
    "info",
    "maintenance",
    "new",
    "success",
    "warning",
  ]),
  /** Customizes the appearance in a legacy theme through colour (see the 'iconColorSets' for possible values) */
  as: PropTypes.oneOf([
    "default",
    "error",
    "help",
    "info",
    "maintenance",
    "new",
    "success",
    "warning",
  ]),
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
};

export default Toast;
