import React, { useEffect, useRef, useCallback } from "react";
import ModalManager from "../../../components/modal/__internal__/modal-manager";

const useModalManager = (
  open: boolean,
  closeModal: (e: KeyboardEvent) => void,
  modalRef: React.RefObject<HTMLElement>,
  setTriggerRefocusFlag?: (flag: boolean) => void
) => {
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

  const registerModal = useCallback(() => {
    /* istanbul ignore else */
    if (!modalRegistered.current) {
      ModalManager.addModal(modalRef.current, setTriggerRefocusFlag);

      modalRegistered.current = true;
    }
  }, [modalRef, setTriggerRefocusFlag]);

  const unregisterModal = useCallback(() => {
    if (modalRegistered.current) {
      ModalManager.removeModal(modalRef.current);

      modalRegistered.current = false;
    }
  }, [modalRef]);

  useEffect(() => {
    if (open) {
      registerModal();
    } else {
      unregisterModal();
    }
  }, [open, registerModal, unregisterModal]);

  useEffect(() => {
    return () => {
      unregisterModal();
    };
  }, [unregisterModal]);
};

export default useModalManager;
