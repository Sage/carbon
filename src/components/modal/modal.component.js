import React, { useEffect, useRef, useCallback, useState } from "react";
import PropTypes from "prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import useScrollBlock from "../../hooks/__internal__/useScrollBlock";
import Portal from "../portal";
import Events from "../../__internal__/utils/helpers/events";
import ModalManager from "./__internal__/modal-manager";
import { StyledModal, StyledModalBackground } from "./modal.style";

export const ModalContext = React.createContext({});

const Modal = ({
  children,
  open,
  onCancel,
  disableEscKey,
  disableClose,
  enableBackgroundUI,
  timeout,
  ...rest
}) => {
  const ref = useRef();
  const listenerAdded = useRef(false);
  const modalRegistered = useRef(false);
  const [isAnimationComplete, setAnimationComplete] = useState(false);
  const [triggerRefocusFlag, setTriggerRefocusFlag] = useState(false);

  const { blockScroll, allowScroll } = useScrollBlock();

  useEffect(() => {
    if (enableBackgroundUI) {
      return;
    }

    if (open) {
      blockScroll();
    } else {
      allowScroll();
    }
  }, [allowScroll, blockScroll, enableBackgroundUI, open]);

  useEffect(() => {
    return () => {
      if (!enableBackgroundUI) {
        allowScroll();
      }
    };
  }, [allowScroll, enableBackgroundUI]);

  const closeModal = useCallback(
    (ev) => {
      const isTopmost = ModalManager.isTopmost(ref.current);

      if (
        onCancel &&
        !disableClose &&
        !disableEscKey &&
        Events.isEscKey(ev) &&
        isTopmost
      ) {
        ev.stopImmediatePropagation();
        onCancel(ev);
      }
    },
    [disableClose, disableEscKey, onCancel]
  );

  const addListener = useCallback(() => {
    /* istanbul ignore else */
    if (!listenerAdded.current) {
      document.addEventListener("keyup", closeModal);

      listenerAdded.current = true;
    }
  }, [closeModal]);

  const removeListener = useCallback(() => {
    if (listenerAdded.current) {
      document.removeEventListener("keyup", closeModal);

      listenerAdded.current = false;
    }
  }, [closeModal]);

  useEffect(() => {
    if (open) {
      addListener();
    }
    if (!open) {
      removeListener();
    }
  }, [addListener, open, removeListener]);

  useEffect(() => {
    return () => {
      removeListener();
    };
  }, [removeListener]);

  const registerModal = useCallback(() => {
    /* istanbul ignore else */
    if (!modalRegistered.current) {
      ModalManager.addModal(ref.current, setTriggerRefocusFlag);

      modalRegistered.current = true;
    }
  }, []);

  const unregisterModal = useCallback(() => {
    if (modalRegistered.current) {
      ModalManager.removeModal(ref.current);

      modalRegistered.current = false;
    }
  }, []);

  useEffect(() => {
    if (open) {
      registerModal();
    }
    if (!open) {
      unregisterModal();
    }
  }, [open, registerModal, unregisterModal]);

  useEffect(() => {
    return () => {
      unregisterModal();
    };
  }, [unregisterModal]);

  let background;
  let content;

  if (open) {
    background = !enableBackgroundUI ? (
      <StyledModalBackground
        data-element="modal-background"
        transitionName="modal-background"
        transitionTime={timeout}
      />
    ) : null;

    content = children;
  }

  return (
    <Portal>
      <StyledModal
        data-state={open ? "open" : "closed"}
        transitionName="modal"
        transitionTime={timeout}
        ref={ref}
        {...rest}
      >
        <TransitionGroup>
          {background && (
            <CSSTransition
              key="modal"
              appear
              classNames="modal-background"
              timeout={timeout}
              onEntered={() => setAnimationComplete(true)}
              onExiting={() => setAnimationComplete(false)}
            >
              {background}
            </CSSTransition>
          )}
        </TransitionGroup>
        <TransitionGroup>
          {content && (
            <CSSTransition appear classNames="modal" timeout={timeout}>
              <ModalContext.Provider
                value={{
                  isAnimationComplete,
                  triggerRefocusFlag,
                }}
              >
                {content}
              </ModalContext.Provider>
            </CSSTransition>
          )}
        </TransitionGroup>
      </StyledModal>
    </Portal>
  );
};

Modal.propTypes = {
  /** Modal content */
  children: PropTypes.node,
  /** A custom close event handler */
  onCancel: PropTypes.func,
  /** Controls the open state of the modal */
  open: PropTypes.bool.isRequired,
  /** Determines if the background is disabled when the modal is open */
  enableBackgroundUI: PropTypes.bool,
  /** Determines if the Esc Key closes the modal */
  disableEscKey: PropTypes.bool,
  /** Determines if the Dialog can be closed */
  disableClose: PropTypes.bool,
  /** Transition time */
  timeout: PropTypes.number,
};

Modal.defaultProps = {
  onCancel: null,
  enableBackgroundUI: false,
  disableEscKey: false,
  timeout: 300,
};

export default Modal;
