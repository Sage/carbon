import { createContext } from "react";

export default createContext<{
  isDisabled: boolean;
} | null>({
  isDisabled: false,
});
