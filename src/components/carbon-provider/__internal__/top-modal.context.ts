import React from "react";

type TopModalContextProps = {
  topModal: HTMLElement | null;
  setHasAdaptiveSidebarModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  hasAdaptiveSidebarModalOpen: boolean;
};

export default React.createContext<TopModalContextProps>({
  topModal: null,
  setHasAdaptiveSidebarModalOpen: () => {},
  hasAdaptiveSidebarModalOpen: false,
});
