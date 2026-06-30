import { createContext } from "react";

export interface PopoverMenuContextProps {
  size: "small" | "medium" | "large";
}

export const PopoverMenuContext = createContext<PopoverMenuContextProps>({
  size: "medium",
});
