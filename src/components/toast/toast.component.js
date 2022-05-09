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
import Logger from "../../__internal__/utils/logger";

let deprecatedWarnTriggered = false;

const Toast = ({
  as,
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
  if (!deprecatedWarnTriggered && as) {
    deprecatedWarnTriggered = true;
    Logger.deprecate(
      // eslint-disable-next-line max-len
      "The `as` prop is deprecated and will soon be removed from the `Toast` component interface. You should use the `variant` prop to achieve the same styling. The following codemod is available to help with updating your code https://github.com/Sage/carbon-codemod/tree/master/transforms/rename-prop"
    );
  }

  const locale = useLocale();

  const toastRef = useRef();
  const timer = useRef();
  const toastContentNodeRef = useRef();

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

  useModalManager(open, dismissToast, toastRef);

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
      <IconButton
        aria-label={locale.toast.ariaLabels.close()}
        data-element="close"
        onAction={onDismiss}
      >
        <Icon type="close" />
      </IconButton>
    );
  }

  function renderToastContent() {
    if (!open) return null;

    const toastProps = {
      isCenter,
      variant: variant || as || "success",
      id,
      maxWidth,
    };

    return (
      <CSSTransition
        enter
        classNames="toast"
        timeout={{ appear: 1600, enter: 1500, exit: 500 }}
        nodeRef={toastContentNodeRef}
      >
        <ToastStyle
          className={componentClasses}
          {...tagComponent(restProps["data-component"] || "toast", restProps)}
          {...toastProps}
          ref={toastContentNodeRef}
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
  variant: PropTypes.oneOf(["error", "info", "success", "warning"]),
  /** Customizes the appearance in a legacy theme through colour (see the 'iconColorSets' for possible values) */
  as: PropTypes.oneOf(["error", "info", "success", "warning"]),
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
