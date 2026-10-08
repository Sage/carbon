import { useEffect } from "react";
import type { RefObject } from "react";

const useCloseSubmenuWhenTriggerIsOutOfView = <T extends HTMLElement>(
  isSubmenu: boolean,
  open: boolean,
  triggerRef: RefObject<T> | undefined,
  onClose: () => void,
  focusTrigger: (options?: FocusOptions) => void,
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
        triggerBox.bottom - triggerBox.height / 2 <= scrollportBox.top ||
        triggerBox.top + triggerBox.height / 2 >= scrollportBox.bottom;

      if (isOutOfView) {
        // focus inside the parent list was moved there deliberately, so only take it from the closing submenu
        const isFocusInParentList = scrollport.contains(document.activeElement);

        onClose();

        if (!isFocusInParentList) {
          // preventScroll stops the refocus from scrolling the trigger back into view against the user's scroll
          focusTrigger({ preventScroll: true });
        }
      }
    };

    scrollport.addEventListener("scroll", closeWhenTriggerIsOutOfView, {
      passive: true,
    });

    return () => {
      scrollport.removeEventListener("scroll", closeWhenTriggerIsOutOfView);
    };
  }, [isSubmenu, open, triggerRef, onClose, focusTrigger]);
};

export default useCloseSubmenuWhenTriggerIsOutOfView;
