import { useEffect } from "react";
import type { RefObject } from "react";

const useCloseSubmenuWhenTriggerIsOutOfView = <T extends HTMLElement>(
  isSubmenu: boolean,
  open: boolean,
  triggerRef: RefObject<T> | undefined,
  onClose: () => void,
) => {
  useEffect(() => {
    if (!isSubmenu || !open) return;

    const triggerElement = triggerRef?.current;
    if (!triggerElement) return;

    const scrollport = triggerElement.closest<HTMLElement>(
      "[role='list'], [role='listbox']",
    );
    if (!scrollport) return;

    const closeWhenTriggerIsOutOfView = () => {
      const triggerBox = triggerElement.getBoundingClientRect();
      const scrollportBox = scrollport.getBoundingClientRect();
      const isOutOfView =
        triggerBox.bottom <= scrollportBox.top ||
        triggerBox.top >= scrollportBox.bottom;

      if (isOutOfView) {
        onClose();
      }
    };

    scrollport.addEventListener("scroll", closeWhenTriggerIsOutOfView, {
      passive: true,
    });

    return () => {
      scrollport.removeEventListener("scroll", closeWhenTriggerIsOutOfView);
    };
  }, [isSubmenu, open, triggerRef, onClose]);
};

export default useCloseSubmenuWhenTriggerIsOutOfView;
