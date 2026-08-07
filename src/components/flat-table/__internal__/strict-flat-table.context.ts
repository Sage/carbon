import createStrictContext from "../../../__internal__/utils/createStrictContext";
import { FlatTableProps } from "../flat-table.component";

export interface StrictFlatTableContextType
  extends Pick<FlatTableProps, "colorTheme" | "size"> {
  tabStopElementId: string;
  notifyTabStopChange: () => void;
}

const [StrictFlatTableProvider, useStrictFlatTableContext] =
  createStrictContext<StrictFlatTableContextType>({
    name: "FlatTableContext",
    errorMessage:
      "Carbon FlatTable: Context not found. Have you wrapped your Carbon subcomponents properly? See stack trace for more details.",
    defaultValue: {
      tabStopElementId: "",
      notifyTabStopChange: () => {},
    },
  });

export { StrictFlatTableProvider, useStrictFlatTableContext };
