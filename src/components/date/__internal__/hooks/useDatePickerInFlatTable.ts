import { useContext, useEffect } from "react";

import FlatTableContext from "../../../flat-table/__internal__/flat-table.context";
import { TableBodyContext } from "../../../table/__internal__/contexts";

/** Coordinates an open picker with its containing FlatTable. */
const useDatePickerInFlatTable = (open?: boolean) => {
  const { setHasOpenDatePicker } = useContext(FlatTableContext);
  const { isInTable } = useContext(TableBodyContext);
  // Prevent FlatTable interactions from interfering with an open date picker.
  useEffect(() => {
    if (!open) return undefined;

    setHasOpenDatePicker?.(true);

    return () => setHasOpenDatePicker?.(false);
  }, [open, setHasOpenDatePicker]);

  return { isInTable };
};

export default useDatePickerInFlatTable;
