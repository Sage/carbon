import React, { useState, useEffect, useRef, ReactNode } from "react";
import TopModalContext from "./top-modal.context";

export const TopModalProvider = ({
  children,
  setHasAdaptiveSidebarModalOpen,
  hasAdaptiveSidebarModalOpen,
}: {
  children: ReactNode;
  setHasAdaptiveSidebarModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  hasAdaptiveSidebarModalOpen: boolean;
}) => {
  const [topModal, setTopModal] = useState<HTMLElement | null>(null);

  // can't add the setter to the global list inside useEffect because that doesn't run until
  // after the render. We use a ref to ensure it only runs once.
  const isFirstRender = useRef(true);

  if (isFirstRender.current) {
    if (!window.__CARBON_INTERNALS_MODAL_SETTER_LIST) {
      window.__CARBON_INTERNALS_MODAL_SETTER_LIST = [];
    }

    window.__CARBON_INTERNALS_MODAL_SETTER_LIST.push(setTopModal);

    isFirstRender.current = false;
  }

  useEffect(() => {
    return () => {
      window.__CARBON_INTERNALS_MODAL_SETTER_LIST =
        window.__CARBON_INTERNALS_MODAL_SETTER_LIST?.filter(
          (setter) => setter !== setTopModal,
        );
    };
  }, []);

  return (
    <TopModalContext.Provider
      value={{
        topModal,
        setHasAdaptiveSidebarModalOpen,
        hasAdaptiveSidebarModalOpen,
      }}
    >
      {children}
    </TopModalContext.Provider>
  );
};

export default TopModalProvider;
