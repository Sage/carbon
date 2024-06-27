import React from "react";
import { FlatTableProps } from "../flat-table.component";

export interface FlatTableContextProps
  extends Pick<FlatTableProps, "colorTheme" | "size"> {
  getTabStopElementId: () => string;
}

export default React.createContext<FlatTableContextProps>({
  getTabStopElementId: () => "",
});
