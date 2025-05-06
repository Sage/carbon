import { createContext } from "react";

interface FlatTableContextType {
  isInFlatTable: boolean;
  setHasOpenDatePicker?: (value: boolean) => void;
}

const FlatTableContext = createContext<FlatTableContextType>({
  isInFlatTable: false,
  setHasOpenDatePicker: undefined,
});

export default FlatTableContext;
