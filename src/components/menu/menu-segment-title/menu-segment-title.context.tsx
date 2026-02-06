import React from "react";

export interface MenuSegmentContextProps {
  isChildOfSegment: boolean;
  overriddenVariant: string;
}

const MenuSegmentContext = React.createContext<MenuSegmentContextProps>({
  isChildOfSegment: false,
  overriddenVariant: "default",
});

export default MenuSegmentContext;
