import React from "react";

export default React.createContext({
  menuType: "light",
  inMenu: false,
  openSubmenuIndex: null,
  setOpenSubmenuIndex: /* istanbul ignore next */ () => {},
});
