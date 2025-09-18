import { useEffect } from "react";

const useAdaptiveSidebarModalFocus = (closeFunction: () => void) => {
  useEffect(() => {
    const handleadaptiveSidebarModalFocusIn = () => closeFunction();

    document.addEventListener(
      "adaptiveSidebarModalFocusIn",
      handleadaptiveSidebarModalFocusIn,
    );
    return () => {
      document.removeEventListener(
        "adaptiveSidebarModalFocusIn",
        handleadaptiveSidebarModalFocusIn,
      );
    };
  }, [closeFunction]);
};

export default useAdaptiveSidebarModalFocus;
