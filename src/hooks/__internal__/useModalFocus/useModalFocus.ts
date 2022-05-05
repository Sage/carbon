import { useState, useEffect } from "react";

export default function useModalFocus(open: boolean) {
  const [tabIndex, setTabIndex] = useState<number | undefined>(0);

  useEffect(() => {
    // ideally would set to -1, but that fails Cypress tests due to Cypress bug.
    // It's OK to set to 0 instead as the tabindex is removed on blur anyway.
    if (open) {
      setTabIndex(0);
    }
  }, [open]);

  // need to remove the container's tabindex after it has been used for initial focus,
  // otherwise (if tabindex is 0) the container would be reachable by keyboard tabbing which we don't want,
  // and if the tabindex is -1 it makes it impossible to scroll any content using the keyboard
  const onBlur = () => {
    /* istanbul ignore else */
    if (open) {
      setTabIndex(undefined);
    }
  };

  return { tabIndex, onBlur };
}
