import { createContext } from "react";
import { TransitionStatus } from "react-transition-group";

export interface SubRowContextProps {
  isSubRow: boolean;
  transitionStatus?: TransitionStatus;
}

export default createContext<SubRowContextProps>({
  isSubRow: false,
});
