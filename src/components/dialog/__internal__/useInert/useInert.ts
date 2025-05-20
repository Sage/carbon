import { useEffect, RefObject, useState } from "react";

interface UseInertProps {
  containerRef: RefObject<HTMLElement>;
  defaultValue: boolean;
  open: boolean;
  isTopModal: boolean;
  hasAdaptiveSidebarModalOpen: boolean;
}

/**
 * Custom hook to manage inert state of portals when modals are open
 * This improves accessibility by ensuring only the active modal can receive focus
 *
 * @param containerRef - Reference to the modal container element
 * @param defaultValue - The default override value to fall back to
 * @param open - Whether the modal is open
 * @param isTopModal - Whether this modal is the topmost modal
 * @param hasAdaptiveSidebarModalOpen - Whether an adaptive sidebar modal is open
 * @returns Object containing localTopOverride state
 */
const useInert = ({
  containerRef,
  defaultValue,
  open,
  isTopModal,
  hasAdaptiveSidebarModalOpen,
}: UseInertProps) => {
  const [localTopOverride, setLocalTopOverride] = useState(defaultValue);

  useEffect(() => {
    if (!containerRef.current || isTopModal || !hasAdaptiveSidebarModalOpen) {
      setLocalTopOverride(defaultValue);
      return;
    }

    /* istanbul ignore else */
    if (!isTopModal && hasAdaptiveSidebarModalOpen) {
      // Find the parent portal element
      let parentPortal = containerRef.current?.parentElement;
      while (
        parentPortal &&
        !parentPortal.classList.contains("carbon-portal")
      ) {
        parentPortal = parentPortal.parentElement;
      }

      if (!parentPortal) {
        setLocalTopOverride(defaultValue);
        return;
      }

      // Get all portals
      const allPortals = document.querySelectorAll(".carbon-portal");

      if (open) {
        setLocalTopOverride(true);

        // Find the dialog content and set focus
        const dialogContent = containerRef.current?.querySelector(
          "[data-role='dialog-content']",
        );

        /* istanbul ignore else */
        if (dialogContent) {
          dialogContent.setAttribute("tabindex", "-1");
          (dialogContent as HTMLDivElement).focus();

          // Remove inert attribute from parent portal
          parentPortal?.removeAttribute("inert");
          parentPortal?.removeAttribute("aria-hidden");

          // Set inert attribute on all other portals
          allPortals.forEach((portal) => {
            if (portal !== parentPortal) {
              portal.setAttribute("inert", "");
              portal.setAttribute("aria-hidden", "true");
            }
          });
        }
      } else {
        setLocalTopOverride(false);

        // Remove inert attribute from all other portals
        allPortals.forEach((portal) => {
          if (portal !== parentPortal) {
            portal.removeAttribute("inert");
            portal.removeAttribute("aria-hidden");
          }
        });
      }
    }
  }, [hasAdaptiveSidebarModalOpen, isTopModal, open, containerRef]);

  return { localTopOverride };
};

export default useInert;
