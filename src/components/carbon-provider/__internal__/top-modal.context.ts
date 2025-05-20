import React from "react";

type TopModalContextProps = {
  hasAdaptiveSidebarModalOpen: boolean;
  setHasAdaptiveSidebarModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  topModal: HTMLElement | null;
};

export default React.createContext<TopModalContextProps>({
  hasAdaptiveSidebarModalOpen: false,
  setHasAdaptiveSidebarModalOpen: () => {},
  topModal: null,
});
