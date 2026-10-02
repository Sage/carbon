import { createContext } from "react";

interface FlatTableContextType {
  setHasOpenDatePicker?: (value: boolean) => void;
}

const FlatTableContext = createContext<FlatTableContextType>({
  setHasOpenDatePicker: undefined,
});

export default FlatTableContext;
