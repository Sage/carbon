import { useState, useEffect } from "react";

export default function useModalFocus(open: boolean) {
  const [tabIndex, setTabIndex] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (open) {
      setTabIndex(-1);
    }
  }, [open]);

  // need to remove the container's tabindex after it has been used for initial focus,
  // otherwise it becomes impossible to scroll any content using the keyboard
  const onBlur = () => {
    /* istanbul ignore else */
    if (open) {
      setTabIndex(undefined);
    }
  };

  return { tabIndex, onBlur };
}
