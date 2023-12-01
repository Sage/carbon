import React, { useEffect, useRef, useCallback } from "react";
import ModalManager from "../../../components/modal/__internal__/modal-manager";

type UseModalManagerArgs = {
  open: boolean;
  closeModal: (e: KeyboardEvent) => void;
  modalRef: React.RefObject<HTMLElement>;
  setTriggerRefocusFlag?: (flag: boolean) => void;
  triggerRefocusOnClose?: boolean;
  topModalOverride?: boolean;
};

const useModalManager = ({
  open,
  closeModal,
  modalRef,
  setTriggerRefocusFlag,
  triggerRefocusOnClose = true,
  topModalOverride = false,
}: UseModalManagerArgs) => {
  const listenerAdded = useRef(false);
  const modalRegistered = useRef(false);

  const handleClose = useCallback(
    (ev: KeyboardEvent) => {
      const isTopmost = ModalManager.isTopmost(modalRef.current);

      if (isTopmost) {
        closeModal(ev);
      }
    },
    [modalRef, closeModal]
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

  const registerModal = useCallback(
    (ref: HTMLElement | null) => {
      /* istanbul ignore else */
      if (!modalRegistered.current) {
        ModalManager.addModal(ref, setTriggerRefocusFlag, topModalOverride);

        modalRegistered.current = true;
      }
    },
    [setTriggerRefocusFlag, topModalOverride]
  );

  const unregisterModal = useCallback(
    (ref: HTMLElement | null) => {
      if (modalRegistered.current) {
        ModalManager.removeModal(ref, triggerRefocusOnClose);

        modalRegistered.current = false;
      }
    },
    [triggerRefocusOnClose]
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
