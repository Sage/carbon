import React, { useState, useEffect, ReactNode } from "react";
import TopModalContext from "./top-modal.context";

const TopModalProvider = ({ children }: { children: ReactNode }) => {
  const [topModal, setTopModal] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!window.__CARBON_INTERNALS_MODAL_SETTER_LIST) {
      window.__CARBON_INTERNALS_MODAL_SETTER_LIST = [];
    }

    window.__CARBON_INTERNALS_MODAL_SETTER_LIST.push(setTopModal);

    return () => {
      window.__CARBON_INTERNALS_MODAL_SETTER_LIST =
        window.__CARBON_INTERNALS_MODAL_SETTER_LIST?.filter(
          (setter) => setter !== setTopModal,
        );
    };
  }, []);

  return (
    <TopModalContext.Provider value={{ topModal }}>
      {children}
    </TopModalContext.Provider>
  );
};

export default TopModalProvider;
