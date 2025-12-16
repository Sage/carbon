import React, { useEffect, useRef, useCallback, useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import useScrollBlock from "../../hooks/__internal__/useScrollBlock";
import Portal from "../../components/portal";
import { getDocument } from "../../__internal__/dom/globals";
import Events from "../../__internal__/utils/helpers/events";
import useModalManager from "../../hooks/__internal__/useModalManager";
import { StyledModal, StyledModalBackground } from "./modal.style";
import { TagProps } from "../../__internal__/utils/helpers/tags";
import ModalContext from "./modal.context";

export interface ModalProps extends TagProps {
  /**
   * @private
   * @internal
   * @ignore
   * Sets className for component. INTERNAL USE ONLY. */
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
  onCancel?: (ev: React.KeyboardEvent<HTMLElement> | KeyboardEvent) => void;
  /** Sets the open state of the modal */
  open: boolean;
  /** Manually override the internal modal stacking order to set this as top */
  topModalOverride?: boolean;
  /** Enables the automatic restoration of focus to the element that invoked
   * the modal when the modal is closed.
   */
  restoreFocusOnClose?: boolean;
}

const MODAL__ANIMATION_DURATION = 300;

const ModalRoot = ({
  children,
  "data-element": dataElement,
  "data-role": dataRole = "modal",
  open,
  onCancel,
  disableEscKey = false,
  disableClose,
  enableBackgroundUI = false,
  topModalOverride,
  restoreFocusOnClose = true,
  ...rest
}: ModalProps) => {
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
    (ev: KeyboardEvent) => {
      if (onCancel && !disableClose && !disableEscKey && Events.isEscKey(ev)) {
        ev.stopImmediatePropagation();
        onCancel(ev);
      }
    },
    [disableClose, disableEscKey, onCancel],
  );

  const safeDocument = getDocument();

  useModalManager({
    open,
    closeModal,
    modalRef: ref,
    setTriggerRefocusFlag,
    topModalOverride,
    focusCallToActionElement:
      restoreFocusOnClose && safeDocument
        ? (safeDocument.activeElement as HTMLElement)
        : undefined,
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
        transitionTime={MODAL__ANIMATION_DURATION}
      />
    ) : null;

    content = children;
  }

  return (
    <StyledModal
      data-component="modal"
      data-element={dataElement}
      data-role={dataRole}
      data-state={open && isAnimationComplete ? "open" : "closed"}
      transitionName="modal"
      transitionTime={MODAL__ANIMATION_DURATION}
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
            timeout={MODAL__ANIMATION_DURATION}
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
            timeout={MODAL__ANIMATION_DURATION}
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
  );
};

const Modal = (props: ModalProps) => (
  <Portal>
    <ModalRoot {...props} />
  </Portal>
);

export default Modal;
