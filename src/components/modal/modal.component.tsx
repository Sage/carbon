import React, { useEffect, useRef, useCallback, useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import useScrollBlock from "../../hooks/__internal__/useScrollBlock";
import Portal from "../portal";
import Events from "../../__internal__/utils/helpers/events";
import useModalManager from "../../hooks/__internal__/useModalManager";
import { StyledModal, StyledModalBackground } from "./modal.style";
import { TagProps } from "../../__internal__/utils/helpers/tags";
import ModalContext from "./__internal__/modal.context";
import Logger from "../../__internal__/utils/logger";

let deprecatedClassNameWarningShown = false;

export interface ModalProps extends Omit<TagProps, "data-component"> {
  /** Custom class name  */
  className?: string;
  /** Modal content */
  children?: React.ReactNode;
  /** The ARIA role to be applied to the modal */
  ariaRole?: string;
  /** Determines if the Esc Key closes the modal */
  disableEscKey?: boolean;
  /** Determines if the Dialog can be closed */
  disableClose?: boolean;
  /** Determines if the background is disabled when the modal is open */
  enableBackgroundUI?: boolean;
  /** A custom close event handler */
  onCancel?: (ev: React.KeyboardEvent<HTMLElement>) => void;
  /** Sets the open state of the modal */
  open: boolean;
  /** Transition time */
  timeout?: number;
  /** Manually override the internal modal stacking order to set this as top */
  topModalOverride?: boolean;
}

const Modal = ({
  children,
  "data-element": dataElement,
  "data-role": dataRole = "modal",
  open,
  onCancel,
  disableEscKey = false,
  disableClose,
  enableBackgroundUI = false,
  timeout = 300,
  topModalOverride,
  ...rest
}: ModalProps) => {
  if (!deprecatedClassNameWarningShown && rest.className) {
    Logger.deprecate(
      "The 'className' prop has been deprecated and will soon be removed from the 'Modal' component.",
    );
    deprecatedClassNameWarningShown = true;
  }
  const ref = useRef<HTMLDivElement>(null);
  const backgroundNodeRef = useRef<HTMLDivElement>(null);
  const contentNodeRef = useRef<HTMLDivElement>(null);
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
      if (onCancel && !disableClose && !disableEscKey && Events.isEscKey(ev)) {
        ev.stopImmediatePropagation();
        onCancel(ev);
      }
    },
    [disableClose, disableEscKey, onCancel],
  );

  useModalManager({
    open,
    closeModal,
    modalRef: ref,
    setTriggerRefocusFlag,
    topModalOverride,
    focusCallToActionElement: document.activeElement as HTMLElement,
  });

  let background;
  let content;

  if (open) {
    background = !enableBackgroundUI ? (
      <StyledModalBackground
        ref={backgroundNodeRef}
        data-element="modal-background"
        data-role="modal-background"
        transitionName="modal-background"
        transitionTime={timeout}
      />
    ) : null;

    content = children;
  }

  return (
    <Portal>
      <StyledModal
        data-component="modal"
        data-element={dataElement}
        data-role={dataRole}
        data-state={open ? "open" : "closed"}
        transitionName="modal"
        transitionTime={timeout}
        topModalOverride={topModalOverride}
        ref={ref}
        {...rest}
      >
        <TransitionGroup>
          {background && (
            <CSSTransition
              nodeRef={backgroundNodeRef}
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
            <CSSTransition
              nodeRef={contentNodeRef}
              appear
              classNames="modal"
              timeout={timeout}
            >
              <ModalContext.Provider
                value={{
                  isAnimationComplete,
                  triggerRefocusFlag,
                  isInModal: true,
                }}
              >
                <div ref={contentNodeRef}>{content}</div>
              </ModalContext.Provider>
            </CSSTransition>
          )}
        </TransitionGroup>
      </StyledModal>
    </Portal>
  );
};

export default Modal;
