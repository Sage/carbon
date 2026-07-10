import { useContext, useEffect } from "react";

import FlatTableContext from "../../../../../flat-table/__internal__/flat-table.context";

const useDatePickerInFlatTable = (open?: boolean) => {
  const { isInFlatTable, setHasOpenDatePicker } = useContext(FlatTableContext);

  // Prevent FlatTable interactions from interfering with an open date picker.
  useEffect(() => {
    setHasOpenDatePicker?.(!!open);
  }, [open, setHasOpenDatePicker]);

  return { isInFlatTable };
};

export default useDatePickerInFlatTable;
