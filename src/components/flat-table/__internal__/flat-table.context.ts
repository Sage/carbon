import React, { Dispatch, SetStateAction } from "react";
import { FlatTableProps } from "../flat-table.component";

export interface FlatTableContextProps
  extends Pick<FlatTableProps, "colorTheme" | "size"> {
  getTabStopElementId: () => string;
  isInFlatTable?: boolean;
  setHasOpenDatePicker?: Dispatch<SetStateAction<boolean>>;
}

export default React.createContext<FlatTableContextProps>({
  getTabStopElementId: () => "",
  isInFlatTable: false,
});
