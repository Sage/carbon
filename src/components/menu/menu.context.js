import React from "react";

export default React.createContext({
  menuType: "light",
  inMenu: false,
  openSubmenuId: null,
  setOpenSubmenuId: /* istanbul ignore next */ () => {},
});
