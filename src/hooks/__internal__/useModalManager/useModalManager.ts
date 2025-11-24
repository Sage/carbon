import React, { useEffect, useRef, useCallback } from "react";
import ModalManager from "../../../__internal__/modal/modal-manager";

type UseModalManagerArgs = {
  open: boolean;
  closeModal: (e: KeyboardEvent) => void;
  modalRef: React.RefObject<HTMLElement>;
  setTriggerRefocusFlag?: (flag: boolean) => void;
  triggerRefocusOnClose?: boolean;
  topModalOverride?: boolean;
  focusCallToActionElement?: HTMLElement;
};

const useModalManager = ({
  open,
  closeModal,
  modalRef,
  setTriggerRefocusFlag,
  triggerRefocusOnClose = true,
  topModalOverride = false,
  focusCallToActionElement,
}: UseModalManagerArgs) => {
  const listenerAdded = useRef(false);
  const modalRegistered = useRef(false);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  const handleClose = useCallback(
    (ev: KeyboardEvent) => {
      const isTopmost = ModalManager.isTopmost(modalRef.current);

      if (isTopmost) {
        closeModal(ev);
      }
    },
    [modalRef, closeModal],
  );

  const addListener = useCallback(() => {
    /* istanbul ignore else */
    if (!listenerAdded.current) {
      document.addEventListener("keyup", handleClose);

      listenerAdded.current = true;
    }
  }, [handleClose]);

  const removeListener = useCallback(() => {
    if (listenerAdded.current) {
      document.removeEventListener("keyup", handleClose);

      listenerAdded.current = false;
    }
  }, [handleClose]);

  useEffect(() => {
    if (open) {
      addListener();
    } else {
      removeListener();
    }
  }, [addListener, open, removeListener]);

  useEffect(() => {
    return () => {
      removeListener();
    };
  }, [removeListener]);

  useEffect(() => {
    if (!lastFocusedElement.current && focusCallToActionElement && open) {
      lastFocusedElement.current = focusCallToActionElement;
    }
  }, [open, focusCallToActionElement]);

  const registerModal = useCallback(
    (ref: HTMLElement | null) => {
      /* istanbul ignore else */
      if (!modalRegistered.current) {
        ModalManager.addModal(ref, setTriggerRefocusFlag, topModalOverride);

        modalRegistered.current = true;
      }
    },
    [setTriggerRefocusFlag, topModalOverride],
  );

  const unregisterModal = useCallback(
    (ref: HTMLElement | null) => {
      if (modalRegistered.current) {
        ModalManager.removeModal(ref, triggerRefocusOnClose);

        if (lastFocusedElement.current) {
          setTimeout(() => {
            lastFocusedElement.current?.focus();
            lastFocusedElement.current = null;
          }, 0);
        }

        modalRegistered.current = false;
      }
    },
    [triggerRefocusOnClose],
  );

  useEffect(() => {
    const ref = modalRef.current;
    if (open) {
      registerModal(ref);
    } else {
      unregisterModal(ref);
    }
  }, [modalRef, open, registerModal, unregisterModal]);

  useEffect(() => {
    const ref = modalRef.current;
    return () => {
      unregisterModal(ref);
    };
  }, [modalRef, unregisterModal]);
};

export default useModalManager;
