import { useContext, useEffect, useState } from "react";
import FlatTableRowContext from "../flat-table-row/__internal__/flat-table-row.context";
import FlatTableContext from "./flat-table.context";

export default (id: string) => {
  const { getTabStopElementId } = useContext(FlatTableContext);
  const [tabIndex, setTabIndex] = useState(-1);
  const {
    expandable,
    firstCellId,
    firstColumnExpandable,
    leftPositions,
    rightPositions,
    onClick,
    onKeyDown,
    highlighted,
    selected,
  } = useContext(FlatTableRowContext);

  const leftPosition = leftPositions[id];
  const rightPosition = rightPositions[id];
  const makeCellSticky =
    leftPosition !== undefined || rightPosition !== undefined;
  const isFirstCell = id === firstCellId;
  const isExpandableCell = expandable && isFirstCell && firstColumnExpandable;

  useEffect(() => {
    const tabstopTimer = setTimeout(() => {
      setTabIndex(isExpandableCell && getTabStopElementId() === id ? 0 : -1);
    }, 0);

    return () => {
      clearTimeout(tabstopTimer);
    };
  }, [getTabStopElementId, isExpandableCell, id]);

  return {
    expandable,
    leftPosition,
    rightPosition,
    makeCellSticky,
    onClick,
    onKeyDown,
    isFirstCell,
    isExpandableCell,
    tabIndex,
    isInHighlightedRow: highlighted,
    isInSelectedRow: selected,
  };
};
