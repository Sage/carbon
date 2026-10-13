import { RefObject, useEffect } from "react";

interface UseCloseOnFocusOutProps {
  open: boolean;
  closeOnFocusOut: boolean;
  isSubmenu: boolean;
  isButtonMenu: boolean;
  controlWrapperRef: RefObject<HTMLDivElement>;
  onClose: (ev?: Event) => void;
}

const useCloseOnFocusOut = ({
  open,
  closeOnFocusOut,
  isSubmenu,
  isButtonMenu,
  controlWrapperRef,
  onClose,
}: UseCloseOnFocusOutProps) => {
  useEffect(() => {
    if (!open || !closeOnFocusOut || isSubmenu || isButtonMenu) {
      return undefined;
    }

    const isAllowedFocusTarget = (target: EventTarget | null) =>
      target instanceof Node && controlWrapperRef.current?.contains(target);

    const handleFocusOut = (ev: FocusEvent) => {
      if (
        isAllowedFocusTarget(ev.target) &&
        !isAllowedFocusTarget(ev.relatedTarget)
      ) {
        onClose(ev);
      }
    };

    document.addEventListener("focusout", handleFocusOut);
    return () => {
      document.removeEventListener("focusout", handleFocusOut);
    };
  }, [
    open,
    closeOnFocusOut,
    isSubmenu,
    isButtonMenu,
    controlWrapperRef,
    onClose,
  ]);
};

export default useCloseOnFocusOut;
