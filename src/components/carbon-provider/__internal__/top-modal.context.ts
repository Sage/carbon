import React from "react";

type TopModalContextProps = {
  topModal: HTMLElement | null;
};

export default React.createContext<TopModalContextProps>({
  topModal: null,
});
