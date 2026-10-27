import { createContext } from "react";

export interface TableContextProps {
  isDraggable: boolean;
  variant: "prominent" | "subtle-white" | "subtle-grey";
  size: "extra-small" | "small" | "medium" | "large" | "extra-large";
}

export default createContext(<TableContextProps>{
  isDraggable: false,
  variant: "prominent",
  size: "medium",
});
