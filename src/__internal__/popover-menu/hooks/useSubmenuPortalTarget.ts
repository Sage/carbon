import { useEffect, useState } from "react";
import type { RefObject } from "react";

const useSubmenuPortalTarget = <T extends HTMLElement>(
  isSubmenu: boolean,
  controlReference?: RefObject<T>,
) => {
  const [submenuPortalTarget, setSubmenuPortalTarget] =
    useState<HTMLElement | null>(null);

  useEffect(() => {
    if (isSubmenu) {
      setSubmenuPortalTarget(
        controlReference?.current?.closest<HTMLElement>(
          "[data-component='popover-menu']",
        ) ?? null,
      );
    }
  }, [isSubmenu, controlReference]);

  return submenuPortalTarget;
};

export default useSubmenuPortalTarget;
